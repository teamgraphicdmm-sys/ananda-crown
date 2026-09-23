const fs = require('fs');
let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

let removedCount = 0;
while (true) {
  const match = html.match(/<a[^>]*?class="[^"]*availability-button[^"]*grey[^"]*"[^>]*>/);
  if (!match) break;
  const startIdx = match.index;
  const endIdx = html.indexOf('</a>', startIdx) + 4;
  console.log(`Removing dummy button #${removedCount + 1}: index ${startIdx} to ${endIdx}`);
  html = html.slice(0, startIdx) + html.slice(endIdx);
  removedCount++;
}

console.log(`Total dummy buttons removed: ${removedCount}`);
fs.writeFileSync('public/ananda_crown_clone.html', html, 'utf8');
