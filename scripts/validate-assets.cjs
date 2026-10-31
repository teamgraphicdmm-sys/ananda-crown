const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),publicRoot=path.join(root,'public');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const sources=[...walk(publicRoot).filter(f=>/\.(html|css|js)$/.test(f)&&!f.includes(path.sep+'vendor'+path.sep)),...walk(path.join(root,'src')).filter(f=>/\.(tsx?|css)$/.test(f))];
const missing=[];
function check(ref,file){
 ref=ref.trim();if(!ref||/^(https?:|data:|blob:|#|tel:|mailto:|\/\/)/.test(ref))return;
 ref=ref.split(/[?#]/)[0];if(!/\.(webp|png|jpe?g|svg|ico|woff2?|otf|mp4|css|js)$/i.test(ref))return;
 if(ref.includes('${')||ref.includes('public/images/'))return;
 const base=ref.startsWith('/')?publicRoot:path.dirname(file);
 const resolved=path.resolve(base,decodeURI(ref).replace(/^\//,''));
 if(!fs.existsSync(resolved))missing.push({file:path.relative(root,file),ref});
}
for(const file of sources){
 const text=fs.readFileSync(file,'utf8');
 if(/\.html$/.test(file))for(const m of text.matchAll(/\b(?:src|href|poster)="([^"]*)"/g))check(m[1],file);
 for(const m of text.matchAll(/\b(?:srcset|imagesrcset)="([^"]*)"/g))for(const part of m[1].split(','))check(part.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/,''),file);
 for(const m of text.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g))check(m[1],file);
 if(/\.(tsx?|js)$/.test(file))for(const m of text.matchAll(/['"](\/(?:images|videos|fonts)\/[^'"]+)['"]/g))check(m[1],path.join(publicRoot,'index.html'));
}
if(missing.length){console.error(JSON.stringify(missing,null,2));process.exitCode=1;}else console.log('All static image, font, stylesheet, script and srcset references resolve.');
