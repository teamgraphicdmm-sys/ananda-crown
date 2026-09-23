const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

let pos = 0;
let occurrences = [];
while ((pos = html.indexOf('availability-table-content floor', pos)) !== -1) {
  occurrences.push(pos);
  pos += 30;
}
console.log('Occurrences of "availability-table-content floor":', occurrences.length);

occurrences.forEach((p, i) => {
  // Let's see 100 chars before and 200 chars after
  const before = html.slice(Math.max(0, p - 60), p).replace(/\s+/g, ' ');
  // find the end of this cell
  // Inside the cell, there are <a ...> tags.
  // The cell ends after the last </a>
  const nextA = html.indexOf('<a', p);
  const nextEndA1 = html.indexOf('</a', nextA);
  const nextEndA2 = html.indexOf('</a', nextEndA1 + 4);
  const cellClose = html.indexOf('</div>', nextEndA2);
  const after = html.slice(cellClose, cellClose + 100).replace(/\s+/g, ' ');
  console.log(`[Cell #${i + 1}] before: "${before}" | after: "${after}"`);
});
