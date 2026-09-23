const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Find AMENITIES SECTION - REFERENCE CARD DESIGN in style tag
const start = html.indexOf('AMENITIES SECTION - REFERENCE CARD DESIGN');
const end = html.indexOf('</style>', start);

console.log(html.slice(start, end));
