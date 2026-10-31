const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),target=path.resolve(root,'out');
if(path.dirname(target)!==root||path.basename(target)!=='out')throw Error('Unsafe output directory');
if(fs.existsSync(target)){
 if(fs.lstatSync(target).isSymbolicLink())throw Error('Refusing to remove an output symlink');
 fs.rmSync(target,{recursive:true,force:true});
}
