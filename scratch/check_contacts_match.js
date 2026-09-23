const fs = require('fs');
const orig = fs.readFileSync('public/one24_source.html', 'utf8');

const regex = /<div class="inquire-open-info-title">\s*<div class="untitled-400-13">CONTACTS<\/div>\s*<\/div>\s*<div class="inquire-open-info-links">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="inquire-open-right">/;
const m = orig.match(regex);
console.log('Regex matched in orig?', !!m);
if (m) {
  console.log('Matched string:');
  console.log(m[0]);
}
