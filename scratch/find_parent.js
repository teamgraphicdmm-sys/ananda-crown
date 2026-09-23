const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const bodyIdx = html.indexOf('<body');
const idx = html.indexOf('availability-button', bodyIdx);
console.log(html.slice(idx - 300, idx + 1200));
