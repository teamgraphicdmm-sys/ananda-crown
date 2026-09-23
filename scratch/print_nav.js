const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const navStart = html.indexOf('class="nav-links-component"');
console.log(html.slice(navStart, navStart + 2200));
