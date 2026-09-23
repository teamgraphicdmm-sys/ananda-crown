const fs = require('fs');

// 1. Run build_clone.js to generate the clean baseline
console.log('Reading build_clone.js...');
require('../build_clone.js'); // this writes public/ananda_crown_clone.html

let v1 = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');
console.log('Baseline V1 length:', v1.length);

// Apply Turn 1 fixes (Step 301, 303)
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepArgs(stepIndex) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIndex}`)) {
      const data = JSON.parse(lines[i]);
      return data.tool_calls?.[0]?.args;
    }
  }
  return null;
}

// Check step 301 & 303
const s301 = getStepArgs(301);
if (s301) {
  v1 = v1.replace(s301.TargetContent, s301.ReplacementContent);
}
const s303 = getStepArgs(303);
if (s303) {
  v1 = v1.replace(s303.TargetContent, s303.ReplacementContent);
}
console.log('After Turn 1 fixes length:', v1.length);
fs.writeFileSync('scratch/version_turn1.html', v1, 'utf8');

// Apply Turn 2 fixes (Step 387: apply_floorplan)
// In step 387:
let v2 = v1;
const urlRegex = /https:\/\/cdn\.prod\.website-files\.com\/63d3a5c57af3481dbebbb1a2\/[^\"]+\.(jpg|pdf)/gi;
v2 = v2.replace(urlRegex, '/images/florplan.png');
v2 = v2.replace(/(<a\s+[^>]*href=)["']#["']([^>]*class=["'][^"']*availability-button)/gi, '$1"/images/florplan.png"$2 target="_blank"');

// Hover CSS and modal from Step 387
const s387Data = lines.find(l => l.includes('"step_index":387'));
const s387Code = JSON.parse(s387Data).tool_calls[0].args.CodeContent;
// Extract cssHoverRules and modalHTML from s387Code
const cssHoverRulesMatch = s387Code.match(/const cssHoverRules = `([\s\S]*?)`;/);
const modalHTMLMatch = s387Code.match(/const modalHTML = `([\s\S]*?)`;/);

if (cssHoverRulesMatch) {
  v2 = v2.replace(/\.availability-button\s*\{[\s\S]*?color:\s*#c2a180\s*!important;\s*\}/i, cssHoverRulesMatch[1].trim());
}
if (modalHTMLMatch && !v2.includes('id="floorplan-modal"')) {
  v2 = v2.replace('</body>', `${modalHTMLMatch[1]}\n</body>`);
}
console.log('Turn 2 (Floorplan added) length:', v2.length);
fs.writeFileSync('scratch/version_turn2.html', v2, 'utf8');

// Apply Turn 3 fixes (Steps 584, 598, 602, 608, 614, 620)
let v3 = v2;
[584, 598, 602, 608, 614, 620].forEach(step => {
  const args = getStepArgs(step);
  if (args && args.TargetContent && args.ReplacementContent) {
    const beforeLen = v3.length;
    v3 = v3.replace(args.TargetContent, args.ReplacementContent);
    const success = v3.length !== beforeLen;
    console.log(`Step ${step} replace success: ${success}`);
  }
});
console.log('Turn 3 (Contact page & Inquire linked) length:', v3.length);
fs.writeFileSync('scratch/version_turn3.html', v3, 'utf8');
