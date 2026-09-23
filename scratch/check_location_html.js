const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const idIdx = html.indexOf('id="location"');
const availIdx = html.indexOf('id="availability"');

if (idIdx !== -1 && availIdx !== -1) {
  const section = html.slice(idIdx, availIdx);
  // Find where location-info starts
  const infoIdx = section.indexOf('class="location-info"');
  console.log('--- From location-info to end of section ---');
  console.log(section.slice(infoIdx));
}
