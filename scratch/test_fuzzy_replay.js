const fs = require('fs');

let html = fs.readFileSync('C:/Users/Admin/AppData/Roaming/Code/User/History/-6d38c520/smNC.html', 'utf8');

const lines = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-cli/brain/f6c0f270-5a5e-4f4b-8a5b-7c35ba2c64d6/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');

const editSteps = [
  845, 849, 932, 938, 946, 950, 966, 1020, 1026, 1058, 1064, 1108, 1221, 1225, 
  1324, 1328, 1479, 1485, 1489, 1523, 1531, 1533, 1583, 1591, 1641, 1645, 1659, 
  1665, 1675, 1691, 1812, 1814, 1881, 1885, 1889, 1927, 1933, 1937, 1965, 1969, 
  2092, 2096, 2116, 2140, 2146, 2152, 2190, 2345, 2349, 2353, 2389, 2464, 2470, 
  2476, 2673, 2710, 2714, 2774, 2780
];

function getStepData(stepIdx) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"step_index":${stepIdx}`)) {
      return JSON.parse(lines[i]);
    }
  }
  return null;
}

function applyFuzzyReplace(fileContent, targetContent, replacementContent) {
  if (fileContent.includes(targetContent)) {
    return fileContent.replace(targetContent, replacementContent);
  }
  
  // Try line-by-line whitespace-trimmed match
  const docLines = fileContent.split('\n');
  const targetLines = targetContent.split('\n').map(l => l.trim());
  
  // Find where targetLines match in docLines
  for (let i = 0; i <= docLines.length - targetLines.length; i++) {
    let match = true;
    for (let j = 0; j < targetLines.length; j++) {
      if (docLines[i + j].trim() !== targetLines[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      // Found the line range: i to i + targetLines.length - 1
      const before = docLines.slice(0, i).join('\n');
      const after = docLines.slice(i + targetLines.length).join('\n');
      return before + (before.length > 0 ? '\n' : '') + replacementContent + (after.length > 0 ? '\n' : '') + after;
    }
  }
  return null;
}

let failed = [];
for (const s of editSteps) {
  const d = getStepData(s);
  const tc = d.tool_calls[0].args;
  const newHtml = applyFuzzyReplace(html, tc.TargetContent, tc.ReplacementContent);
  if (newHtml !== null) {
    html = newHtml;
  } else {
    console.log(`Step ${s} completely failed!`);
    failed.push(s);
  }
}

console.log(`Failed steps: ${failed.length}`, failed);
console.log('Final HTML bytes (stat):', Buffer.byteLength(html, 'utf8'), 'lines:', html.split('\n').length);
