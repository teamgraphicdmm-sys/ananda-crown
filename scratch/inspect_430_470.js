const fs = require('fs');

const doc = fs.readFileSync('scratch/exact_baseline.html', 'utf8').split('\n');
const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/ccbbe164-f8bb-4567-ab09-0c3483c55d25/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

// Let's print doc lines 430 to 500
console.log('Doc lines 430 to 470:');
for (let i = 430; i < 470; i++) {
  console.log(`${i+1}: ${doc[i]}`);
}
