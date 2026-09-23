// Replaces the #vision (About Us) section of public/ananda_crown_clone.html
// with the reference two-column layout (photo composition + serif copy),
// using the site palette (espresso/copper/sand), site fonts
// (Cormorant Garamond + Montserrat) and a top-entry + scroll parallax.
// Run: node update-vision.js

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "public", "ananda_crown_clone.html");

const NEW_SECTION = `<section id="vision" class="vision-section panel">
<style>
.ac-about{position:relative;display:grid;grid-template-columns:1.02fr .98fr;gap:clamp(2rem,5vw,4.5rem);align-items:center;width:100%;max-width:1240px;margin:0 auto;padding:clamp(.5rem,2vw,2rem) 0 clamp(2.5rem,4vw,4rem)}
.ac-media{position:relative;min-height:clamp(340px,40vw,540px)}
.ac-shape{position:absolute;opacity:0;transition:opacity .9s ease}
.ac-about.in-view .ac-shape{opacity:1}
.ac-s-back{left:-4%;bottom:-6%;width:62%;height:70%;background:#221814;transition-delay:.15s}
.ac-about.in-view .ac-s-back{transition-delay:.15s}
.ac-s-top{right:2%;top:-8%;width:54%;height:32%;background:#9e6443;transition-delay:.3s}
.ac-s-low{left:24%;bottom:-12%;width:32%;height:18%;background:#c2a180;transition-delay:.45s}
.ac-frame{position:absolute;inset:5% 6% 9% 7%;overflow:hidden;opacity:0;transform:translateY(-72px);transition:transform 1.15s cubic-bezier(.16,1,.3,1),opacity .9s ease}
.ac-about.in-view .ac-frame{transform:translateY(0);opacity:1}
.ac-frame img{width:100%;height:100%;object-fit:cover;display:block}
.ac-copy{position:relative}
.ac-rise{opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .9s cubic-bezier(.16,1,.3,1)}
.ac-about.in-view .ac-rise{opacity:1;transform:translateY(0)}
.ac-about.in-view .ac-rise:nth-child(1){transition-delay:.1s}
.ac-about.in-view .ac-rise:nth-child(2){transition-delay:.22s}
.ac-about.in-view .ac-rise:nth-child(3){transition-delay:.34s}
.ac-about.in-view .ac-rise:nth-child(4){transition-delay:.44s}
.ac-about.in-view .ac-rise:nth-child(5){transition-delay:.54s}
.ac-eyebrow{font-family:'Montserrat',sans-serif;font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#9e6443;margin:0 0 18px}
.ac-title{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(2.1rem,3.6vw,3.4rem);line-height:1.12;letter-spacing:0;color:#221814;margin:0 0 20px;text-transform:none}
.ac-body{font-family:'Montserrat',sans-serif;font-weight:400;font-size:15px;line-height:1.8;color:#4a4038;margin:0 0 22px;max-width:34em}
.ac-strong{font-family:'Montserrat',sans-serif;font-weight:600;font-size:15px;letter-spacing:.02em;color:#221814;margin:0 0 26px}
.ac-cta{display:inline-block;font-family:'Montserrat',sans-serif;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#f7f2ed;background:#9e6443;border-radius:999px;padding:15px 32px;text-decoration:none;transition:background .3s ease,transform .3s ease}
.ac-cta:hover{background:#221814;transform:translateY(-2px)}
@media (max-width:900px){
.ac-about{grid-template-columns:1fr;gap:2.5rem}
.ac-media{min-height:min(78vw,380px)}
.ac-s-back{left:-3%;height:66%}
.ac-s-top{top:-6%;height:30%}
}
</style>
<div class="ac-about" id="acAbout">
<div class="ac-media" data-ac-speed="46">
<div class="ac-shape ac-s-back"></div>
<div class="ac-shape ac-s-top"></div>
<div class="ac-shape ac-s-low"></div>
<figure class="ac-frame" style="margin:0">
<img src="/images/hero-building-sunset.webp" alt="Ananda Crown luxury residences at sunset, Sector 78 Mohali" loading="eager" decoding="async" />
</figure>
</div>
<div class="ac-copy" data-ac-speed="14">
<p class="ac-eyebrow ac-rise">About us</p>
<h2 class="ac-title ac-rise">A new crown rising over Mohali</h2>
<p class="ac-body ac-rise">Crafted by Ananda Group in Sector 78, SAS Nagar, Ananda Crown brings palatial 3, 4 and 5 BHK sky residences with 11.5 ft ceilings, a 600 ft boulevard frontage and private skydecks — minutes from the airport, PCA Stadium and the Tricity&apos;s finest schools and hospitals.</p>
<p class="ac-strong ac-rise">Come, experience royal living.</p>
<a class="ac-cta ac-rise" href="/contact">Schedule a private visit</a>
</div>
</div>
<script>
(function(){
var s=document.getElementById('acAbout');
if(!s){return;}
if(!('IntersectionObserver' in window)){s.classList.add('in-view');return;}
var io=new IntersectionObserver(function(entries){
entries.forEach(function(x){if(x.isIntersecting){s.classList.add('in-view');io.disconnect();}});
},{threshold:.22});
io.observe(s);
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){return;}
var items=s.querySelectorAll('[data-ac-speed]');
var ticking=false;
function update(){
ticking=false;
var r=s.getBoundingClientRect();
var vh=window.innerHeight||1;
var p=(r.top+r.height/2-vh/2)/vh;
for(var i=0;i<items.length;i++){
var sp=parseFloat(items[i].getAttribute('data-ac-speed'))||0;
items[i].style.transform='translate3d(0,'+(-p*sp).toFixed(1)+'px,0)';
}
}
function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',onScroll);
update();
})();
</script>
<div class="horizontal-line-wrap mb-block">
<div class="horizontal-line grey"></div>
</div>
</section>`;

const html = fs.readFileSync(FILE, "utf8");
const matches = html.match(/<section id="vision"[\s\S]*?<\/section>/g) || [];
if (matches.length !== 1) {
  console.error(`update-vision: expected 1 vision section, found ${matches.length}`);
  process.exit(1);
}
fs.writeFileSync(FILE, html.replace(matches[0], NEW_SECTION));
console.log("update-vision: vision section replaced");
