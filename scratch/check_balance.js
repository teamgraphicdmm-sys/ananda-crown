const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Check if any unclosed tags or broken hierarchy exist
console.log('Total <div> in html:', (html.match(/<div\b/g) || []).length);
console.log('Total </div> in html:', (html.match(/<\/div>/g) || []).length);
console.log('Total <section in html:', (html.match(/<section\b/g) || []).length);
console.log('Total </section> in html:', (html.match(/<\/section>/g) || []).length);
console.log('Total <a> in html:', (html.match(/<a\b/g) || []).length);
console.log('Total </a> in html:', (html.match(/<\/a\s*>/g) || []).length);
