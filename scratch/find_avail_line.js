const fs = require('fs');
const html = fs.readFileSync('scratch/baseline_turn1_exact.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('availability-section panel')) {
    console.log('availability-section panel at line:', i + 1);
  }
});
