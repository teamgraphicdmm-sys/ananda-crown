const fs = require('fs');

// Read transcript full
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

function getStepData(stepIndex) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIndex}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

// Start from one24_source.html
// Let's see what was in public/ananda_crown_clone.html at Step 18 (271,952 bytes)
// Let's check how public/ananda_crown_clone.html at Step 18 was constructed
