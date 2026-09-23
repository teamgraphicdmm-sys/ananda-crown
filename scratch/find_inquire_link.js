const fs = require('fs');
const html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');

const navIdx = html.indexOf('class="nav-');
console.log('Nav start pos:', navIdx);
let pos = navIdx;
for (let i = 0; i < 10; i++) {
  pos = html.indexOf('inquire', pos + 1);
  if (pos === -1) break;
  console.log('Match at pos ' + pos + ':');
  console.log(html.slice(pos - 60, pos + 150));
}
