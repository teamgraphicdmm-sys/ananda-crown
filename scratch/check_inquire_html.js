const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const idx = html.indexOf('inquire-open-right');
console.log(html.slice(idx - 100, idx + 500));
