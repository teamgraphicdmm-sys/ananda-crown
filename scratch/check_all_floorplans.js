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

  const statusMatch = item.match(/<div class="availability-table-content status">([\s\S]*?)<\/div>\s*<\/div>/);
  const status = statusMatch ? statusMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'Unknown';

  // Find all <a tags inside availability-floorplan
  const floorplanSection = (item.match(/<div class="availability-floorplan">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<div class="horizontal-line-wrap">/) || [])[1] || '';
  const aTags = [...floorplanSection.matchAll(/<a\b[\s\S]*?<\/a\s*>/g)].map(m => m[0]);
  
  console.log(`\nUnit #${i}: Fraction ${frac} | Floor ${floor} | Status: "${status}"`);
  console.log(`  Floorplan buttons count: ${aTags.length}`);
  aTags.forEach((a, idx) => {
    const openTag = a.match(/<a[^>]*>/)[0].replace(/\s+/g, ' ');
    const isHidden = openTag.includes('w-condition-invisible');
    const isGrey = openTag.includes('grey');
    console.log(`    Btn ${idx + 1}: ${openTag} [grey: ${isGrey}, invisible: ${isHidden}]`);
  });
}
