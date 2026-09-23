const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

let pos = 0;
const results = [];
while ((pos = html.indexOf('availability-button', pos)) !== -1) {
  // Check if it is within an HTML tag (preceded by class=")
  const before = html.slice(Math.max(0, pos - 20), pos);
  if (before.includes('class=')) {
    const aStart = html.lastIndexOf('<a', pos);
    const aEnd = html.indexOf('</a>', pos);
    if (aStart !== -1 && aEnd !== -1) {
      results.push({
        start: aStart,
        end: aEnd + 4,
        content: html.slice(aStart, aEnd + 4)
      });
    }
  }
  pos += 19;
}

console.log('Total button elements found:', results.length);

results.forEach((r, i) => {
  const openingTag = r.content.match(/<a[^>]*>/)[0].replace(/\s+/g, ' ');
  // Find which fraction this belongs to
  const preceding = html.slice(Math.max(0, r.start - 4000), r.start);
  const fracMatch = preceding.match(/<div class="tobias-300-32 mb-16">\s*([A-Z0-9]+)\s*<\/div>/);
  const fraction = fracMatch ? fracMatch[1] : 'Unknown';
  console.log(`[#${i + 1}] Fraction: ${fraction} | ${openingTag}`);
});
