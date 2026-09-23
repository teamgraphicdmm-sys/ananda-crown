const fs = require('fs');
const html = fs.readFileSync('public/one24_source.html', 'utf8');

const heroStart = html.indexOf('<div class="hero-component">');
console.log('heroStart:', heroStart);
const heroImg = html.indexOf('6405d4c052dec18e7d8789b9_hero.webp');
console.log('heroImg:', heroImg);
if (heroStart !== -1 && heroImg !== -1) {
  console.log('Between heroStart and heroImg:');
  console.log(JSON.stringify(html.slice(heroImg - 50, heroImg + 60)));
}
