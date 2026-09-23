const fs = require('fs');
const orig = fs.readFileSync('public/one24_source.html', 'utf8');

// Find first floor cell in orig
const idx = orig.indexOf('availability-table-content floor');
const cellStart = orig.lastIndexOf('<div', idx);
const nextA = orig.indexOf('<a', idx);
const nextEndA1 = orig.indexOf('</a', nextA);
const nextEndA2 = orig.indexOf('</a', nextEndA1 + 4);
const cellClose = orig.indexOf('</div>', nextEndA2);
const cellEnd = cellClose + 6;

const cellContent = orig.slice(cellStart, cellEnd);
console.log('Cell content:');
console.log(cellContent);

const openDivs = (cellContent.match(/<div\b/g) || []).length;
const closeDivs = (cellContent.match(/<\/div>/g) || []).length;
console.log(`Original cell has openDivs: ${openDivs}, closeDivs: ${closeDivs}`);
