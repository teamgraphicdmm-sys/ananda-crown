const fs = require('fs');

const current = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Let's check what sections exist in current
const sections = [...current.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log('IDs in current:', sections);

// Check if #home, #vision, #apartments, #island, #location, #availability exist
['home', 'vision', 'apartments', 'island', 'location', 'availability'].forEach(id => {
  console.log(`id="${id}":`, current.includes(`id="${id}"`));
});
