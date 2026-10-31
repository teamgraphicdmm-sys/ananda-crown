const fs=require('fs'),path=require('path'),sharp=require('sharp');
const files=['index.html','contact.html','founder.html','founders.html','public/ananda_crown_clone.html','public/contact.html','public/founder.html','public/founders.html'];
(async()=>{
 const variants=new Map();let changed=0;
 for(const file of files){
  let html=fs.readFileSync(file,'utf8');
  const tags=[...html.matchAll(/<img\b[^>]*>/gi)];
  for(const match of tags){
   const original=match[0],src=original.match(/\bsrc="([^"]+)"/)?.[1];
   if(!src||/^(https?:|data:)/.test(src))continue;
   const ref=decodeURI(src.replace(/^\//,''));
   const asset=path.join('public',ref);
   if(!fs.existsSync(asset)||!/\.(webp|png|jpe?g)$/.test(asset))continue;
   const meta=await sharp(asset).metadata();
   let tag=original;
   const attr=(key,value)=>{const re=new RegExp('\\b'+key+'="[^"]*"');if(re.test(tag))tag=tag.replace(re,key+'="'+value+'"');else tag=tag.replace(/\s*\/?>(\s*)$/, ' '+key+'="'+value+'" />');};
   if(!/\bwidth=/.test(tag))attr('width',meta.width);
   if(!/\bheight=/.test(tag))attr('height',meta.height);
   attr('decoding','async');
   const hero=/hero-image-background/.test(tag);
   const logo=/logo/i.test(ref)&&/nav|logo/.test(tag);
   attr('loading',hero||logo?'eager':'lazy');
   if(hero){
    attr('fetchpriority','high');
    attr('srcset','videos/hero-frames-mobile/frame_0001.webp 768w, videos/hero-frames-webp/frame_0001.webp 1280w');attr('sizes','100vw');
   }else if(meta.width>1000&&fs.statSync(asset).size>80000&&!/floorplan|florplan|logo/i.test(ref)){
    if(!variants.has(ref)){
     const generated=[];
     for(const width of [640,1024]){
      if(width>=meta.width)continue;
      const small=ref.replace(/\.[^.]+$/, '-'+width+'.webp');
      await sharp(asset).resize({width}).webp({quality:82}).toFile(path.join('public',small));
      fs.mkdirSync(path.dirname(small),{recursive:true});fs.copyFileSync(path.join('public',small),small);
      generated.push([small,width]);
     }
     generated.push([ref,meta.width]);variants.set(ref,generated);
    }
    const prefix=src.startsWith('/')?'/':'';
    attr('srcset',variants.get(ref).map(([url,w])=>prefix+encodeURI(url)+' '+w+'w').join(', '));
    const sizes=/founder/.test(tag)?'(max-width: 700px) 72vw, (max-width: 1024px) 40vw, 24vw':/residence-story-image/.test(tag)?'(max-width: 700px) 100vw, 60vw':'100vw';
    attr('sizes',sizes);
   }
   if(tag!==original){html=html.replace(original,tag);changed++;}
  }
  // Match the hero preload to the browser's selected responsive source.
  html=html.replace('as="image" href="videos/hero-frames-webp/frame_0001.webp" fetchpriority="high"','as="image" href="videos/hero-frames-webp/frame_0001.webp" imagesrcset="videos/hero-frames-mobile/frame_0001.webp 768w, videos/hero-frames-webp/frame_0001.webp 1280w" imagesizes="100vw" fetchpriority="high"');
  fs.writeFileSync(file,html);
 }
 console.log({updatedImageTags:changed,responsiveImages:variants.size});
})().catch(e=>{console.error(e);process.exitCode=1;});
