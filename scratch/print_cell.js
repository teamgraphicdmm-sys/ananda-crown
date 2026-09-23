const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const regex = /<div class="availability-table-content floor">([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  i++;
  if (i === 1 || i === 12 || i === 13) {
    console.log(`=== Floor cell #${i} ===`);
    console.log(m[0]);
  }
}
