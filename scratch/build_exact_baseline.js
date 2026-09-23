const fs = require('fs');

let html = fs.readFileSync('C:/Users/Admin/AppData/Roaming/Code/User/History/-6d38c520/smNC.html', 'utf8');

const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIdx) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIdx}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

// 1. Steps up to 1026
[845, 849, 932, 938, 946, 950, 966, 1020, 1026].forEach(s => {
  const tc = getStepData(s).tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
});

// 2. Step 1058 exact replacement:
const s1058Old = `        transition: opacity 0.6s ease, transform 0.6s ease !important;
      }

      .location-info-wrap.n1 {
        z-index: 5 !important;
        opacity: 1;
        pointer-events: auto;
      }

      .location-info-wrap.n2 {
        z-index: 4 !important;
        opacity: 0;
        pointer-events: none;
      }

      .location-info-wrap.n3 {
        z-index: 3 !important;
        opacity: 0;
        pointer-events: none;
      }

      .location-info-wrap.n4 {
        z-index: 2 !important;
        opacity: 0;
        pointer-events: none;
      }

      .location-info-wrap.n5 {
        z-index: 1 !important;
        opacity: 0;
        pointer-events: none;
      }`;

const s1058New = `        will-change: opacity, transform !important;
      }

      .location-info-wrap.n1 {
        z-index: 2;
        opacity: 1;
        pointer-events: auto;
      }

      .location-info-wrap.n2,
      .location-info-wrap.n3,
      .location-info-wrap.n4,
      .location-info-wrap.n5 {
        z-index: 1;
        opacity: 0;
        pointer-events: none;
      }`;

if (html.includes(s1058Old)) {
  html = html.replace(s1058Old, s1058New);
  console.log('Step 1058 applied cleanly!');
} else {
  console.log('Step 1058 target not found');
}

// 3. Next steps 1064 to 1328
[1064, 1108, 1221, 1225, 1324, 1328].forEach(s => {
  const tc = getStepData(s).tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
});

// Steps 1583 to 2470
[1583, 1591, 1641, 1645, 1659, 1665, 1675, 1691, 1812, 1814, 1881, 1885, 1889, 1927, 1933, 1937, 1965, 1969, 2092, 2096, 2116, 2140, 2146, 2152, 2190, 2345, 2349, 2353, 2389, 2464, 2470].forEach(s => {
  const tc = getStepData(s).tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
});

// Step 2476: remove .n5
const oldN5_1 = `      .location-info-wrap.n1,
      .location-info-wrap.n2,
      .location-info-wrap.n3,
      .location-info-wrap.n4,
      .location-info-wrap.n5 {`;

const newN5_1 = `      .location-info-wrap.n1,
      .location-info-wrap.n2,
      .location-info-wrap.n3,
      .location-info-wrap.n4 {`;

const oldN5_2 = `      .location-info-wrap.n2,
      .location-info-wrap.n3,
      .location-info-wrap.n4,
      .location-info-wrap.n5 {`;

const newN5_2 = `      .location-info-wrap.n2,
      .location-info-wrap.n3,
      .location-info-wrap.n4 {`;

html = html.replace(oldN5_1, newN5_1);
html = html.replace(oldN5_2, newN5_2);
console.log('Step 2476 applied cleanly!');

// Step 2673: favicons
const s2673 = getStepData(2673).tool_calls[0].args;
html = html.replace(s2673.TargetContent, s2673.ReplacementContent);

// Step 2714: nav-home active in markup
const s2714 = getStepData(2714).tool_calls[0].args;
html = html.replace(s2714.TargetContent, s2714.ReplacementContent);

// Step 2774: nav dot styling
const s2774Repl = getStepData(2774).tool_calls[0].args.ReplacementContent;
const navAfterIdx = html.indexOf('.nav-link.home::after');
if (navAfterIdx !== -1) {
  const blockStart = html.lastIndexOf('/* Active underline', navAfterIdx);
  const blockEnd = html.indexOf('/* Hide original Webflow nav dots', navAfterIdx);
  html = html.slice(0, blockStart) + s2774Repl + '\n\n      ' + html.slice(blockEnd);
  console.log('Step 2774 applied!');
}

// Step 2780: parallax on location-big-img
const s2780 = getStepData(2780).tool_calls[0].args;
html = html.replace(s2780.TargetContent, s2780.ReplacementContent);

console.log('Final Reconstructed Baseline:');
console.log('Byte length (Buffer):', Buffer.byteLength(html, 'utf8'));
console.log('Lines:', html.split('\n').length);
fs.writeFileSync('scratch/baseline_turn1_exact.html', html, 'utf8');
