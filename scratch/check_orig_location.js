const fs = require('fs');
const html = fs.readFileSync('public/one24_source.html', 'utf8');

const idIdx = html.indexOf('id="location"');
const availIdx = html.indexOf('id="availability"');
if (idIdx !== -1 && availIdx !== -1) {
  const section = html.slice(idIdx, availIdx);
  console.log('Original location section length:', section.length);
  const infoIdx = section.indexOf('class="location-info"');
  console.log(section.slice(infoIdx, infoIdx + 3000));
}
