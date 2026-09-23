const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');
const items = html.split('class="availability-col-item');
console.log('Number of items:', items.length - 1);
for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const frac = (item.match(/class="tobias-300-32 mb-16">([\s\S]*?)<\/div>/) || [])[1]?.trim();
  const floor = (item.match(/class="untitled-400-13">([0-9]+)<\/div>/) || [])[1]?.trim();
  const statusMatch = item.match(/class="availability-table-content status">([\s\S]*?)<\/div>\s*<\/div>/);
  const status = statusMatch ? statusMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const btnMatches = [...item.matchAll(/<a[^>]*class="availability-button[^>]*>[\s\S]*?<\/a>/g)];
  console.log(`Unit ${i}: Floor ${floor} ${frac} (${status}) has ${btnMatches.length} button(s):`);
  btnMatches.forEach((b, bi) => {
    const classAttr = b[0].match(/class="([^"]*)"/)?.[1];
    const href = b[0].match(/href="([^"]*)"/)?.[1];
    console.log(`   [${bi}] class="${classAttr}" href="${href}"`);
  });
}
