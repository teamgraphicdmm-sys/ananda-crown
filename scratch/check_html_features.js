const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

console.log('florplan.png in html:', html.includes('/images/florplan.png'));
console.log('availability-button:hover in html:', html.includes('availability-button:hover'));
console.log('href="/contact" in html:', html.includes('href="/contact"'));
console.log('Total availability-button occurrences in html:', (html.match(/availability-button/g) || []).length);
