const fs = require('fs');
const orig = fs.readFileSync('public/one24_source.html', 'utf8');

const heroComponentStart = '<div class="hero-component">';
const startIdx = orig.indexOf(heroComponentStart);
console.log('startIdx:', startIdx);

const imgIdx = orig.indexOf('6405d4c052dec18e7d8789b9_hero.webp');
console.log('imgIdx:', imgIdx);
if (imgIdx !== -1) {
  console.log('Before imgIdx:');
  console.log(JSON.stringify(orig.slice(imgIdx - 40, imgIdx)));
}
