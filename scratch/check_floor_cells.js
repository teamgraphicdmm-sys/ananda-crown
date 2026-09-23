const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const regex = /<div[^>]*class="availability-table-content floor"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  i++;
  const block = m[1];
  const aTags = block.match(/<a[\s\S]*?<\/a>/g) || [];
  
  // Find unit fraction before this block
  const before = html.slice(Math.max(0, m.index - 2000), m.index);
  const fracMatch = before.match(/<div class="tobias-300-32 mb-16">([\s\S]*?)<\/div>/g);
  const lastFrac = fracMatch ? fracMatch[fracMatch.length - 1].replace(/<[^>]+>/g, '').trim() : 'Unknown';

  console.log(`\nFloor cell #${i} [Fraction: ${lastFrac}] has ${aTags.length} <a> tag(s):`);
  aTags.forEach((a, j) => {
    const rawTag = a.match(/<a[^>]*>/)[0].replace(/\r?\n/g, ' ');
    const isGrey = rawTag.includes('grey');
    const isInvisible = rawTag.includes('w-condition-invisible');
    console.log(`   [${j+1}] grey: ${isGrey}, invisible: ${isInvisible} | ${rawTag}`);
  });
}
