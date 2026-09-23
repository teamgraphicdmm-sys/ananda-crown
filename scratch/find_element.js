const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const idx = html.indexOf('class="availability-button');
console.log('Index:', idx);
console.log(html.slice(idx - 200, idx + 1200));
