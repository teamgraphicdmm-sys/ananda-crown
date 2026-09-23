const fs = require('fs');

let buildCode = fs.readFileSync('build_clone.js', 'utf8');

// Replace the bounds check with exact index finding
const oldBounds = `const heroComponentStart = '<div class="hero-component">';
const heroComponentEnd = '</div></div><img src="https://cdn.prod.website-files.com/63d3a5c57af34837d7bbb1a0/6405d4c052dec18e7d8789b9_hero.webp"';

const newHeroComponentHTML = \`
<div class="ref-hero-container">`;

const newBounds = `const heroComponentStart = '<div class="hero-component">';

const newHeroComponentHTML = \`
<div class="ref-hero-container">`;

buildCode = buildCode.replace(oldBounds, newBounds);

const oldLogic = `const startIdx = html.indexOf(heroComponentStart);
const endIdx = html.indexOf(heroComponentEnd);
if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx + heroComponentStart.length) + newHeroComponentHTML + html.substring(endIdx);
  console.log('Successfully replaced hero-component content with exact div balance.');
} else {
  console.error('Could not find hero-component bounds!');
}`;

const newLogic = `const startIdx = html.indexOf(heroComponentStart);
const heroImgIdx = html.indexOf('6405d4c052dec18e7d8789b9_hero.webp', startIdx);
const lastDiv2 = html.lastIndexOf('</div>', heroImgIdx);
const lastDiv1 = html.lastIndexOf('</div>', lastDiv2 - 1);
const endIdx = lastDiv1;
if (startIdx !== -1 && heroImgIdx !== -1) {
  html = html.substring(0, startIdx + heroComponentStart.length) + newHeroComponentHTML + html.substring(endIdx);
  console.log('Successfully replaced hero-component content with exact div balance.');
} else {
  console.error('Could not find hero-component bounds!');
}`;

buildCode = buildCode.replace(oldLogic, newLogic);
fs.writeFileSync('scratch/run_fixed_build.js', buildCode, 'utf8');
console.log('Created scratch/run_fixed_build.js');
