// Minify only the static website copied from public; Next already minifies its own runtime.
const fs=require('fs'),path=require('path');
const {minify}=require('next/dist/compiled/terser');
const {transform}=require('lightningcss');
const {createHash}=require('crypto');
const root=path.resolve(__dirname,'../out');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(e.name==='_next'?[]:walk(path.join(dir,e.name))):[path.join(dir,e.name)]);
(async()=>{
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
