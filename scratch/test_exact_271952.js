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

const allSteps = [
  845, 849, 932, 938, 946, 950, 966, 1020, 1026, 1064, 1108, 1221, 1225, 
  1324, 1328, 1583, 1591, 1641, 1645, 1659, 1665, 1675, 1691, 1812, 1814, 
  1881, 1885, 1889, 1927, 1933, 1937, 1965, 1969, 2092, 2096, 2116, 2140, 
  2146, 2152, 2190, 2345, 2349, 2353, 2389, 2464, 2470, 2673, 2714
];

for (const s of allSteps) {
  const tc = getStepData(s).tool_calls[0].args;
  html = html.replace(tc.TargetContent, tc.ReplacementContent);
}

// Step 2774 ReplacementContent
const s2774Repl = getStepData(2774).tool_calls[0].args.ReplacementContent;
const oldNavBlock = `      .nav-link {
        text-decoration: none !important;
        position: relative !important;
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }

      .nav-link .untitled-400-13 {
        font-family: "Montserrat", sans-serif !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        letter-spacing: 0.2em !important;
        text-transform: uppercase !important;
        color: #221814 !important;
        transition: color 0.3s ease !important;
      }
      .nav-link:hover .untitled-400-13 {
        color: #9e6443 !important;
      }

      /* Active underline on home */
      .nav-link.home::after {
        content: "" !important;
        display: block !important;
        width: 90% !important;
        height: 1.5px !important;
        background-color: #9e6443 !important;
        margin-top: 4px !important;
      }

      /* Hide original Webflow nav dots on the hero */
      .nav-ball {
        display: none !important;
      }`;

if (html.includes(oldNavBlock)) {
  html = html.replace(oldNavBlock, s2774Repl);
  console.log('Step 2774 replaced exact nav block successfully!');
} else {
  console.log('oldNavBlock not matched');
}

// Step 2780
const s2780 = getStepData(2780).tool_calls[0].args;
if (html.includes(s2780.TargetContent)) {
  html = html.replace(s2780.TargetContent, s2780.ReplacementContent);
  console.log('Step 2780 replaced successfully!');
}

console.log('Exact stats:');
console.log('Bytes:', Buffer.byteLength(html, 'utf8'));
console.log('Lines:', html.split('\n').length);
fs.writeFileSync('scratch/exact_baseline.html', html, 'utf8');
