const fs = require('fs');

// Read transcript to get exact replacements in order
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIndex) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIndex}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

// 1. Run build_clone.js to generate the clean base
require('../build_clone.js');
let html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');
console.log('Base length after build_clone:', html.length);

// 2. Step 301 & 303
const s301 = getStepData(301).tool_calls[0].args;
if (html.includes(s301.TargetContent)) {
  html = html.replace(s301.TargetContent, s301.ReplacementContent);
  console.log('Step 301 applied');
} else {
  console.log('Step 301 target not found');
}

const s303 = getStepData(303).tool_calls[0].args;
if (html.includes(s303.TargetContent)) {
  html = html.replace(s303.TargetContent, s303.ReplacementContent);
  console.log('Step 303 applied');
} else {
  console.log('Step 303 target not found');
}

// 3. Step 387: apply_floorplan
// In Step 387, apply_floorplan.js was executed on ananda_crown_clone.html
const s387Code = getStepData(387).tool_calls[0].args.CodeContent;
fs.writeFileSync('scratch/run_s387.js', s387Code, 'utf8');
// Save html so run_s387 can read it
fs.writeFileSync('public/ananda_crown_clone.html', html, 'utf8');
require('./run_s387.js');
html = fs.readFileSync('public/ananda_crown_clone.html', 'utf8');
console.log('After step 387 length:', html.length);

// 4. Steps 584, 598, 602, 608, 614, 620
[584, 598, 602, 608, 614, 620].forEach(step => {
  const tc = getStepData(step).tool_calls[0].args;
  if (html.includes(tc.TargetContent)) {
    html = html.replace(tc.TargetContent, tc.ReplacementContent);
    console.log(`Step ${step} applied successfully!`);
  } else {
    console.log(`Step ${step} TARGET NOT FOUND! Target length: ${tc.TargetContent.length}`);
  }
});

console.log('Final HTML length at Step 668:', html.length);
fs.writeFileSync('public/ananda_crown_clone.html', html, 'utf8');
console.log('Successfully written exact Step 668 state to public/ananda_crown_clone.html!');
