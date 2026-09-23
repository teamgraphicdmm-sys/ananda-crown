const fs = require('fs');

const orig = fs.readFileSync('public/one24_source.html', 'utf8');

// Check all strings build_clone tried to replace
const checks = [
  '<div class="hero-component">',
  'hero-component',
  'https://cdn.prod.website-files.com/63d3a5c57af34837d7bbb1a0/6405d4c052dec18e7d8789b9_hero.webp',
  'hero-img-background',
  'https://assets-global.website-files.com/63d3a5c57af34837d7bbb1a0/css/one24.webflow.54f8ed0ce.css',
  'https://cdn.prod.website-files.com/63d3a5c57af34837d7bbb1a0/6440fcdd9913381980813a0b_one24.txt'
];

checks.forEach(c => {
  console.log(`"${c.slice(0, 40)}": in orig? ${orig.includes(c)}`);
});
