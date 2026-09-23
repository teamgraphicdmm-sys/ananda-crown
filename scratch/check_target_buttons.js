const fs = require('fs');

const html = fs.readFileSync('scratch/turn3_target_state.html', 'utf8');

// Find all availability floor cells
const cells = [];
let pos = 0;
while ((pos = html.indexOf('availability-table-content floor', pos)) !== -1) {
  const cellStart = html.lastIndexOf('<div', pos);
  const cellEnd = html.indexOf('</div>', pos + 30) + 6;
  const content = html.slice(cellStart, cellEnd + 500);
  const btns = content.match(/class="[^"]*availability-button[^"]*"/g) || [];
  cells.push({ index: cells.length + 1, btnsCount: btns.length, btns: btns });
  pos = pos + 35;
}

console.log('Total floor cells:', cells.length);
cells.forEach(c => {
  console.log(`Unit ${c.index}: ${c.btnsCount} button(s) - ${JSON.stringify(c.btns)}`);
});
