// Re-run after adding new images. Originals are removed separately by audit-assets.js.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ROOT = __dirname;
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const sources = [...fs.readdirSync(ROOT).filter(f=>/\.(html|css|js)$/.test(f)&&!['optimize-assets.js','preview-server.js','export-clone.js'].includes(f)).map(f=>path.join(ROOT,f)),...walk(path.join(ROOT,'src')).filter(f=>/\.(css|tsx?|jsx?)$/.test(f)),...walk(path.join(ROOT,'public')).filter(f=>/\.(html|css|js)$/.test(f))];
(async()=>{
 const sourceText = new Map(sources.map(f=>[f,fs.readFileSync(f,'utf8')]));
 const allText=[...sourceText.values()].join('\n');
 const result=[];
 for(const file of walk(path.join(ROOT,'public/images'))){
  if(!/\.(png|jpe?g|webp)$/i.test(file)||/\.optimized(?:-\d+)?\.webp$/.test(file))continue;
  const ref=path.relative(path.join(ROOT,'public'),file).replaceAll('\\','/');
  const oldSize=fs.statSync(file).size;
  if(oldSize<65000||!allText.includes(ref))continue;
  const plan=/floorplan|florplan/i.test(ref);
  const output=file.replace(/\.[^.]+$/,'.optimized.webp');
  const meta=await sharp(file).metadata();
  await sharp(file).rotate().resize({width:plan?2600:1920,height:plan?2600:1920,fit:'inside',withoutEnlargement:true}).webp({quality:plan?92:83,effort:5}).toFile(output);
  const newSize=fs.statSync(output).size;
  if(newSize>=oldSize){fs.unlinkSync(output);continue;}
  const newRef=path.relative(path.join(ROOT,'public'),output).replaceAll('\\','/');
  const rootCopy=path.join(ROOT,newRef);
  fs.mkdirSync(path.dirname(rootCopy),{recursive:true});fs.copyFileSync(output,rootCopy);
  for(const [name,text] of sourceText)sourceText.set(name,text.replaceAll(ref,newRef).replaceAll(encodeURI(ref),encodeURI(newRef)));
  result.push({from:ref,to:newRef,oldBytes:oldSize,newBytes:newSize,width:meta.width,height:meta.height});
 }
 // Every source frame is retained; smaller WebP images preserve the complete motion.
 let framesBefore=0,framesAfter=0;
 const frameSource=path.join(ROOT,'public/videos/hero-frames');
 if(fs.existsSync(frameSource)){
  const frameFiles=walk(frameSource).filter(f=>/\.jpg$/.test(f));
  for(const file of frameFiles){
   framesBefore+=fs.statSync(file).size;
   for(const [folder,width] of [['hero-frames-webp',1280],['hero-frames-mobile',768]]){
    const ref='videos/'+folder+'/'+path.basename(file,'.jpg')+'.webp';
    const target=path.join(ROOT,'public',ref);
    fs.mkdirSync(path.dirname(target),{recursive:true});
    await sharp(file).resize({width,withoutEnlargement:true}).webp({quality:78,effort:4}).toFile(target);
    const mirror=path.join(ROOT,ref);fs.mkdirSync(path.dirname(mirror),{recursive:true});fs.copyFileSync(target,mirror);
    framesAfter+=fs.statSync(target).size;
   }
  }
 }
 for(const [file,text] of sourceText)if(text!==fs.readFileSync(file,'utf8'))fs.writeFileSync(file,text);
 fs.writeFileSync(path.join(ROOT,'scripts/image-optimization.json'),JSON.stringify({images:result,frames:{beforeBytes:framesBefore,afterBytes:framesAfter}},null,2)+'\n');
 console.log(JSON.stringify({images:result.length,beforeMB:result.reduce((s,r)=>s+r.oldBytes,0)/1048576,afterMB:result.reduce((s,r)=>s+r.newBytes,0)/1048576,framesBeforeMB:framesBefore/1048576,framesAfterMB:framesAfter/1048576}));
})().catch(e=>{console.error(e);process.exitCode=1;});
