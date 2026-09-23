const fs = require('fs');
let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const regex = /<a[^>]*?class="[^"]*availability-button[^"]*grey[^"]*"[^>]*>/g;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  console.log(`[${count}] ${m[0].replace(/\r?\n/g, ' ')}`);
}
