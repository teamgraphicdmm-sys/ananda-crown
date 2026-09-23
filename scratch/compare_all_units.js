const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const items = html.split(/role="listitem"\s+class="availability-col-item w-dyn-item"/);
console.log('Total units found:', items.length - 1);

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const fracMatch = item.match(/<div class="tobias-300-32 mb-16">\s*([A-Z0-9]+)\s*<\/div>/);
  const frac = fracMatch ? fracMatch[1] : 'Unknown';

  const floorMatch = item.match(/<div class="availability-floor">\s*<div class="availability-table-content">\s*<div class="tobias-300-16">\s*([0-9]+)\s*<\/div>/);
  const floor = floorMatch ? floorMatch[1] : 'Unknown';

  // Find all <a tags
  const aTags = [...item.matchAll(/<a[\s\S]*?<\/a>/g)].map(m => m[0]);
  
  console.log(`\n--- Unit #${i}: Fraction ${frac} (Floor ${floor}) ---`);
  console.log(`Total <a> tags: ${aTags.length}`);
  aTags.forEach((a, idx) => {
    const openTag = a.match(/<a[^>]*>/)[0].replace(/\s+/g, ' ');
    console.log(`  Button ${idx + 1}: ${openTag}`);
  });
}
