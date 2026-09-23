const fs = require('fs');

// Test replacing hero-component properly in one24_source
let code = fs.readFileSync('build_clone.js', 'utf8');

// Replace the string matching with regex matching
const oldBoundsCheck = `const startIdx = html.indexOf(heroComponentStart);
const endIdx = html.indexOf(heroComponentEnd);
if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx + heroComponentStart.length) + newHeroComponentHTML + html.substring(endIdx);
  console.log('Successfully replaced hero-component content with exact div balance.');
} else {
  console.error('Could not find hero-component bounds!');
}`;

const newBoundsCheck = `const heroRegex = /<div class="hero-component">[\s\S]*?<\/div>\s*<\/div>\s*<img\s+src="https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af34837d7bbb1a0\/6405d4c052dec18e7d8789b9_hero\.webp"/;
const match = html.match(heroRegex);
if (match) {
  html = html.replace(heroRegex, '<div class="hero-component">' + newHeroComponentHTML + '</div></div><img src="https://cdn.prod.website-files.com/63d3a5c57af34837d7bbb1a0/6405d4c052dec18e7d8789b9_hero.webp"');
  console.log('Successfully replaced hero-component with regex match!');
} else {
  console.error('Hero regex did not match');
}`;

console.log('Old bounds check in build_clone.js?', code.includes(oldBoundsCheck));
code = code.replace(oldBoundsCheck, newBoundsCheck);
fs.writeFileSync('scratch/test_build_clone.js', code, 'utf8');
