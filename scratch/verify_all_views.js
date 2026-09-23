const fs = require('fs');
const html = fs.readFileSync('scratch/baseline_turn1_exact.html', 'utf8');
const docLines = html.split('\n');

const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

// Collect all views of ananda_crown_clone.html before step 301
const views = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('view_file') && lines[i].includes('ananda_crown_clone.html')) {
    const d = JSON.parse(lines[i]);
    if (d.step_index < 301) {
      const tc = d.tool_calls[0].args;
      const nextD = JSON.parse(lines[i+1]);
      views.push({
        step: d.step_index,
        start: tc.StartLine,
        end: tc.EndLine,
        content: nextD.content
      });
    }
  }
}

console.log('Total views before step 301:', views.length);

for (const v of views) {
  // Parse lines from content
  const cLines = v.content.split('\n');
  let firstLineNum = null;
  const parsedLines = [];
  for (const l of cLines) {
    const m = l.match(/^([0-9]+):\s?(.*)$/);
    if (m) {
      const lineNum = parseInt(m[1]);
      if (firstLineNum === null) firstLineNum = lineNum;
      parsedLines.push({ num: lineNum, text: m[2] });
    }
  }
  
  if (parsedLines.length > 0) {
    let mismatches = 0;
    for (const pl of parsedLines) {
      const actualLine = docLines[pl.num - 1];
      if (actualLine !== pl.text) {
        if (mismatches === 0) {
          console.log(`Mismatch in view at step ${v.step} (line ${pl.num}):`);
          console.log(`  expected: ${JSON.stringify(pl.text)}`);
          console.log(`  actual:   ${JSON.stringify(actualLine)}`);
        }
        mismatches++;
      }
    }
    if (mismatches === 0) {
      console.log(`View at step ${v.step} (lines ${v.start}-${v.end}): 100% PERFECT MATCH!`);
    } else {
      console.log(`View at step ${v.step} (lines ${v.start}-${v.end}): ${mismatches} mismatches`);
    }
  }
}
