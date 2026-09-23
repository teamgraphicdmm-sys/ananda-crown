const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const idx = html.indexOf('id="availability"');
console.log(html.slice(idx - 300, idx + 500));

// Find next section after availability
const nextSection = html.indexOf('<section', idx + 100);
if (nextSection !== -1) {
  console.log('Next section:');
  console.log(html.slice(nextSection, nextSection + 500));
} else {
  // Check for other containers
  const availEnd = html.indexOf('class="availability-wrap"', idx);
  console.log('Avail wrap pos:', availEnd);
}
