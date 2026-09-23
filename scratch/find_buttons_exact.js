const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

// Find all indices of availability-button
let pos = 0;
let buttonIndices = [];
while ((pos = html.indexOf('availability-button', pos)) !== -1) {
  // Find opening <a before pos
  const aStart = html.lastIndexOf('<a', pos);
  const aEnd = html.indexOf('</a>', pos);
  if (aStart !== -1 && aEnd !== -1 && aStart > (buttonIndices[buttonIndices.length - 1]?.aStart || -1)) {
    buttonIndices.push({ aStart, aEnd, pos });
  }
  pos += 19;
}

console.log('Total availability-button <a> elements found:', buttonIndices.length);

buttonIndices.forEach((item, idx) => {
  const aTag = html.slice(item.aStart, item.aEnd + 4);
  const openTag = aTag.match(/<a[^>]*>/)[0].replace(/\r?\n/g, ' ');
  
  // Find fraction before this button
  const before = html.slice(Math.max(0, item.aStart - 3000), item.aStart);
  const fracMatches = [...before.matchAll(/<div class="tobias-300-32 mb-16">([\s\S]*?)<\/div>/g)];
  const fraction = fracMatches.length ? fracMatches[fracMatches.length - 1][1].trim() : 'Unknown';

  console.log(`[Btn #${idx + 1}] Fraction: ${fraction} | Tag: ${openTag}`);
});
