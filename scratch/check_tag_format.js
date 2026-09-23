const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Look around line 2095
const idx = html.indexOf('ver planta');
console.log('Snippet around first "ver planta":');
console.log(JSON.stringify(html.slice(idx, idx + 200)));
