// Conservative asset cleanup: all HTML entry points and both implementations are roots.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const walk=dir=>fs.existsSync(dir)?fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]):[];
const sourceFiles=[...fs.readdirSync(root).filter(f=>/\.(html|css|js)$/.test(f)&&!['optimize-assets.js','export-clone.js','preview-server.js'].includes(f)).map(f=>path.join(root,f)),...walk(path.join(root,'src')).filter(f=>/\.(tsx?|css|jsx?)$/.test(f)),...walk(path.join(root,'public')).filter(f=>/\.(html|css|js)$/.test(f))];
const text=sourceFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
const heroManifest=path.join(root,'scripts/hero-sequence.json');
const hero=fs.existsSync(heroManifest)?JSON.parse(fs.readFileSync(heroManifest,'utf8')):null;
const candidates=[];
for(const bucket of ['images','videos','fonts','js','css'])for(const file of walk(path.join(root,'public',bucket))){
 const ref=path.relative(path.join(root,'public'),file).replaceAll('\\','/');
 const dynamic=hero?[hero.desktop,hero.mobile].some(dir=>ref.startsWith(dir)):/^videos\/hero-frames-(webp|mobile)\//.test(ref);
 const editingSource=hero&&ref===hero.source.replace(/^public\//,'');
 const license=/license|readme|notice/i.test(path.basename(file));
 if(dynamic||ref===hero?.desktopVideo||editingSource||license||text.includes(ref)||text.includes(encodeURI(ref)))continue;
 candidates.push({path:ref,bytes:fs.statSync(file).size});
}
for(const name of ['file.svg','globe.svg','next.svg','vercel.svg','window.svg']){
 const file=path.join(root,'public',name);if(fs.existsSync(file)&&!text.includes(name))candidates.push({path:name,bytes:fs.statSync(file).size});
}
const report={unusedFiles:candidates.length,publicBytes:candidates.reduce((s,f)=>s+f.bytes,0),files:candidates};
fs.writeFileSync(path.join(root,'scripts/asset-cleanup.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(process.argv.includes('--clean')){
 for(const candidate of candidates)for(const base of ['public','']){
  const file=path.resolve(root,base,candidate.path);
  if(!file.startsWith(root+path.sep))throw Error('Refusing path outside project: '+file);
  if(fs.existsSync(file)&&fs.statSync(file).isFile())fs.unlinkSync(file);
 }
 console.log('Removed only the reported unused assets and their root mirrors. Reference folders were not inspected or modified.');
}
