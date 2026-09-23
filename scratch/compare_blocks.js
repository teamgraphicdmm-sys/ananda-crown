const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const regex = /<div class="availability-floorplan">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  if (count === 13) {
    console.log('=== UNIT 13 FULL BLOCK ===');
    console.log(m[1]);
  } else if (count === 2) {
    console.log('=== UNIT 2 FULL BLOCK (for comparison) ===');
    console.log(m[1]);
  }
}
