const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Also check original one24_source.html
const orig = fs.readFileSync('public/one24_source.html', 'utf8');
console.log('ORIG: open divs:', (orig.match(/<div\b/g) || []).length, 'close divs:', (orig.match(/<\/div>/g) || []).length);
