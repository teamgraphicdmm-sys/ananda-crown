const fs = require('fs');

let html = fs.readFileSync('scratch/exact_baseline.html', 'utf8');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIdx) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIdx}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

// 1. Turn 1 fixes: Step 301 and 303
const s301 = getStepData(301).tool_calls[0].args;
if (html.includes(s301.TargetContent)) {
  html = html.replace(s301.TargetContent, s301.ReplacementContent);
  console.log('Turn 1: Step 301 applied!');
} else {
  console.log('Turn 1: Step 301 target not found');
}

const s303 = getStepData(303).tool_calls[0].args;
if (html.includes(s303.TargetContent)) {
  html = html.replace(s303.TargetContent, s303.ReplacementContent);
  console.log('Turn 1: Step 303 applied!');
} else {
  console.log('Turn 1: Step 303 target not found');
}

// 2. Turn 2 fixes: Step 387
const s387Code = getStepData(387).tool_calls[0].args.CodeContent;
fs.writeFileSync('scratch/run_turn2_apply.js', s387Code, 'utf8');
fs.writeFileSync('scratch/temp_turn2.html', html, 'utf8');

// Modify run_turn2_apply.js to operate on scratch/temp_turn2.html
let runTurn2Code = fs.readFileSync('scratch/run_turn2_apply.js', 'utf8');
runTurn2Code = runTurn2Code.replace(/public\/ananda_crown_clone\.html/g, 'scratch/temp_turn2.html');
fs.writeFileSync('scratch/run_turn2_apply.js', runTurn2Code, 'utf8');
require('./run_turn2_apply.js');

html = fs.readFileSync('scratch/temp_turn2.html', 'utf8');
console.log('Turn 2 applied! Length:', html.length);

// 3. Turn 3 fixes: Steps 584, 598, 602, 608, 614, 620
[584, 598, 602, 608, 614, 620].forEach(step => {
  const tc = getStepData(step).tool_calls[0].args;
  if (html.includes(tc.TargetContent)) {
    html = html.replace(tc.TargetContent, tc.ReplacementContent);
    console.log(`Turn 3: Step ${step} applied!`);
  } else {
    console.log(`Turn 3: Step ${step} TARGET NOT FOUND! Target len: ${tc.TargetContent.length}`);
  }
});

// Also check nav link to /contact
html = html.replace(
  /<a href="[^"]*" class="nav-link inquire w-inline-block"/,
  '<a href="/contact" class="nav-link inquire w-inline-block"'
);

console.log('Turn 3 (Final Target State) stats:');
console.log('Byte length (Buffer):', Buffer.byteLength(html, 'utf8'));
console.log('Lines:', html.split('\n').length);

fs.writeFileSync('scratch/turn3_target_state.html', html, 'utf8');
