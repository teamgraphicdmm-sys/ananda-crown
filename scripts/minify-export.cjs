// Minify only the static website copied from public; Next already minifies its own runtime.
const fs=require('fs'),path=require('path');
const {minify}=require('next/dist/compiled/terser');
const {transform}=require('lightningcss');
const {createHash}=require('crypto');
const root=path.resolve(__dirname,'../out');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(e.name==='_next'?[]:walk(path.join(dir,e.name))):[path.join(dir,e.name)]);
(async()=>{
 // Keep the large local editing source out of the static deployment artifact.
 const heroManifest=path.resolve(__dirname,'hero-sequence.json');
 if(fs.existsSync(heroManifest)){
  const hero=JSON.parse(fs.readFileSync(heroManifest,'utf8'));
  const source=hero.source;
  // Omit superseded sequences from deployment; keep source originals locally.
  const videoRoot=path.resolve(root,'videos');
  const active=new Set([hero.desktop,hero.mobile].map(dir=>dir.split('/')[1]));
  if(fs.existsSync(videoRoot))for(const entry of fs.readdirSync(videoRoot,{withFileTypes:true})){
   if(!entry.isDirectory()||!/^hero-website-[a-f0-9]{12}(?:-fast-v\d+)?$/.test(entry.name)||active.has(entry.name))continue;
   const stale=path.resolve(videoRoot,entry.name);
   if(path.dirname(stale)!==videoRoot||fs.lstatSync(stale).isSymbolicLink())throw Error('Unsafe stale sequence path');
   fs.rmSync(stale,{recursive:true,force:true});
  }
  if(typeof source==='string'&&source.startsWith('public/videos/')&&source.endsWith('.mp4')){
   const editingSource=path.resolve(root,source.slice('public/'.length));
   if(editingSource.startsWith(root+path.sep)&&fs.existsSync(editingSource))fs.unlinkSync(editingSource);
  }
 }
 let before=0,after=0,count=0;
 const css=code=>transform({filename:'site.css',code:Buffer.from(code),minify:true,errorRecovery:true}).code.toString();
 for(const file of walk(root)){
  if(!/\.(css|js|html)$/.test(file)||/\.min\.js$/.test(file))continue;
  const original=fs.readFileSync(file,'utf8');let output=original;
  if(file.endsWith('.css'))output=css(original);
  else if(file.endsWith('.js'))output=(await minify(original,{format:{comments:/@license|@preserve|copyright/i}})).code;
  else if(!original.includes('__next_f')){
   output=original.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi,(_,attr,code)=>'<style'+attr+'>'+css(code)+'</style>');
   const matches=[...output.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
   for(const match of matches){
    if(!match[2].trim()||/type=["'](?:application\/ld\+json|application\/json)["']/.test(match[1]))continue;
    const code=(await minify(match[2],{format:{comments:false}})).code;
    output=output.replace(match[0],'<script'+match[1]+'>'+code+'</script>');
   }
  }
  if(output!==original){fs.writeFileSync(file,output);before+=Buffer.byteLength(original);after+=Buffer.byteLength(output);count++;}
 }
 // Preserve the libraries' execution order while avoiding nine separate requests.
 const vendors=['js/jquery-3.5.1.min.js','js/webflow.js','js/vendor/gsap.min.js','js/vendor/ScrollTrigger.min.js','js/SplitText.min.js','js/vendor/Flip.min.js','js/vendor/ScrollToPlugin.min.js','js/vendor/CustomEase.min.js','js/lenis.min.js'];
 const bundle=(await minify(vendors.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n;\n'),{format:{comments:/@license|@preserve|copyright/i}})).code;
 fs.writeFileSync(path.join(root,'js/vendor/site-vendor.min.js'),bundle);
 for(const file of walk(root).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  if(html.includes('__next_f'))continue;
  const pattern=/<script src="js\/jquery-3\.5\.1\.min\.js"[^>]*><\/script>[\s\S]*?<script src="js\/lenis\.min\.js"><\/script>/;
  const block=html.match(pattern);
  if(block&&vendors.every(f=>block[0].includes('src="'+f+'"')))fs.writeFileSync(file,html.replace(pattern,'<script src="js/vendor/site-vendor.min.js"></script>'));
 }
 // Content versions let updated assets bypass an older browser/CDN cache.
 const base=(process.env.NEXT_PUBLIC_BASE_PATH||process.env.NEXT_BASE_PATH||'').replace(/^\/+|\/+$/g,'');
 function version(url,file){
  if(/^(?:https?:|data:|blob:|\/\/|#)/.test(url))return url;
  let local=decodeURI(url.split(/[?#]/)[0]);
  if(!/\.(?:css|js|webp|png|jpe?g|svg|woff2?|otf)$/.test(local))return url;
  if(base&&local.startsWith('/'+base+'/'))local=local.slice(base.length+1);
  const target=local.startsWith('/')?path.join(root,local):path.resolve(path.dirname(file),local);
  if(!target.startsWith(root+path.sep)||!fs.existsSync(target))return url;
  const hash=createHash('sha256').update(fs.readFileSync(target)).digest('hex').slice(0,12);
  return url.split(/[?#]/)[0]+'?v='+hash;
 }
 for(const file of walk(root).filter(f=>f.endsWith('.css'))){
  const text=fs.readFileSync(file,'utf8');
  fs.writeFileSync(file,text.replace(/url\((['"]?)([^)'"\s]+)\1\)/g,(_,quote,url)=>'url('+quote+version(url,file)+quote+')'));
 }
 for(const file of walk(root).filter(f=>f.endsWith('.html'))){
  let text=fs.readFileSync(file,'utf8');
  if(text.includes('__next_f'))continue;
  text=text.replace(/\b(src|href|poster)="([^"]*)"/g,(_,attr,url)=>attr+'="'+version(url,file)+'"');
  text=text.replace(/\b(srcset|imagesrcset)="([^"]*)"/g,(_,attr,list)=>attr+'="'+list.split(',').map(part=>{
   const match=part.trim().match(/^(.*?)(\s+\d+(?:\.\d+)?[wx])?$/);return version(match[1],file)+(match[2]||'');
  }).join(', ')+'"');
  fs.writeFileSync(file,text);
 }
 console.log(`Minified ${count} static files: ${(before/1024).toFixed(0)} KB -> ${(after/1024).toFixed(0)} KB. Source files remain readable.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
