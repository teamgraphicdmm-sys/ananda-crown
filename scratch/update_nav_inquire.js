const fs = require('fs');
let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

html = html.replace(
  '<a href="#" class="nav-link inquire w-inline-block"',
  '<a href="/contact" class="nav-link inquire w-inline-block"'
);

fs.writeFileSync('public/ananda_crown_clone.html', html, 'utf8');
console.log('Updated navbar inquire link. href="/contact" in html:', html.includes('href="/contact"'));
