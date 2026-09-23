const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const start = html.indexOf('AMENITIES SECTION - REFERENCE CARD DESIGN');
console.log(html.slice(start, start + 2500));
