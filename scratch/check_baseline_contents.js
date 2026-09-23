const fs = require('fs');

const html = fs.readFileSync('scratch/exact_baseline.html', 'utf8');

console.log('--- Checking exact_baseline.html ---');
console.log('Total length:', html.length, 'lines:', html.split('\n').length);

const checks = [
  'ref-hero-container',
  'ref-hero-heading',
  'AMENITIES',
  'amenity-card-img',
  'location-section panel',
  'availability-section panel',
  'availability-button',
  'one24.js',
  'one24.css',
  'initAmenitiesControls'
];

checks.forEach(c => {
  const count = (html.match(new RegExp(c, 'g')) || []).length;
  console.log(`  ${c}: ${count} occurrences`);
});

// Check availability units count
const unitMatches = html.match(/availability-table-content floor/g) || [];
console.log('Availability floor units count:', unitMatches.length);
