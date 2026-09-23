const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// List all fractions and their button counts
const units = html.split('role="listitem"');
console.log('List items count:', units.length);

units.slice(1).forEach((u, idx) => {
  const fracMatch = u.match(/<div class="tobias-300-32 mb-16">([\s\S]*?)<\/div>/);
  if (!fracMatch) return;
  const frac = fracMatch[1].trim();
  const floorMatch = u.match(/<div class="availability-floor">[\s\S]*?<div class="tobias-300-16">([\s\S]*?)<\/div>/);
  const floor = floorMatch ? floorMatch[1].trim() : '?';
  const statusMatch = u.match(/<div class="availability-storeroom">[\s\S]*?<div class="availability-portugues">[\s\S]*?<div class="tobias-300-16">([\s\S]*?)<\/div>/);
  const status = statusMatch ? statusMatch[1].trim() : '?';

  // Count buttons
  const buttons = u.match(/class="availability-button[^"]*"/g) || [];
  console.log(`Unit ${idx}: Fraction ${frac} (Floor ${floor}, Status: ${status}) -> ${buttons.length} button tags:`);
  buttons.forEach(b => console.log('   ' + b));
});
