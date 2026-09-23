const fs = require('fs');
let html = fs.readFileSync('scratch/reconstructed_271952.html', 'utf8');

// Check around location-info-wrap.n5
const idx = html.indexOf('.location-info-wrap.n5');
console.log('location-info-wrap.n5 at:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 100, idx + 200));
}

// Check around border-radius: 4px
let p = 0;
while ((p = html.indexOf('border-radius: 4px', p)) !== -1) {
  console.log('border-radius at:', p);
  console.log(html.slice(p - 60, p + 150));
  p += 20;
}
