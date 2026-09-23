const fs = require('fs');

const doc = fs.readFileSync('scratch/exact_baseline.html', 'utf8').split('\n');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

// Find all views before step 301
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('view_file') && lines[i].includes('ananda_crown_clone.html')) {
    const d = JSON.parse(lines[i]);
    if (d.step_index < 301) {
      const tc = d.tool_calls[0].args;
      const nextD = JSON.parse(lines[i+1]);
      const viewLines = nextD.content.split('\n');
      for (const vl of viewLines) {
        const m = vl.match(/^([0-9]+):\s?(.*)$/);
        if (m) {
          const expectedLineNum = parseInt(m[1]);
          const expectedText = m[2];
          // Find where expectedText appears in doc around expectedLineNum
          let foundOffset = null;
          for (let offset = -40; offset <= 40; offset++) {
            const idx = expectedLineNum - 1 + offset;
            if (idx >= 0 && idx < doc.length && doc[idx] === expectedText) {
              foundOffset = offset;
              break;
            }
          }
          if (foundOffset !== null && foundOffset !== 0) {
            console.log(`Line offset at expected line ${expectedLineNum}: found at doc line ${expectedLineNum + foundOffset} (offset: ${foundOffset > 0 ? '+' : ''}${foundOffset})`);
            break;
          }
        }
      }
    }
  }
}
