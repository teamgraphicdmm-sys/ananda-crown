const fs = require('fs');

let html = fs.readFileSync('public/one24_source.html', 'utf8');

// Find where hero.webp is
const imgIdx = html.indexOf('6405d4c052dec18e7d8789b9_hero.webp');
console.log('imgIdx:', imgIdx);

// Print 100 characters before imgIdx
console.log('Before imgIdx:');
console.log(JSON.stringify(html.slice(imgIdx - 80, imgIdx + 40)));
