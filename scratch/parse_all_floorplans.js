const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Find all availability-floorplan blocks
let count = 0;
const regex = /<div class="availability-floorplan">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  count++;
  const block = m[1];
  const idx = m.index;
  const before = html.slice(Math.max(0, idx - 1500), idx);
  const frac = (before.match(/<div class="tobias-300-32 mb-16">([\s\S]*?)<\/div>/) || [])[1] || 'Header';
  
  // Count buttons in this block
  const a1 = block.includes('class="availability-button w-inline-block"') || block.includes('class="availability-button target="_blank" w-inline-block');
  const a2 = block.includes('class="availability-button grey') || block.includes('class="availability-button target="_blank" grey');
  const inv1 = block.includes('w-condition-invisible');
  
  console.log(`[Unit ${count}] Fraction: ${frac.trim()}`);
  console.log('   Block snippet:', block.replace(/\s+/g, ' ').slice(0, 150));
}
