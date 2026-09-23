const fs = require('fs');
const path = require('path');

const histDir = 'C:/Users/Admin/AppData/Roaming/Code/User/History';
const folders = fs.readdirSync(histDir);
const today = '2026-09-18';

for (const f of folders) {
  const entriesPath = path.join(histDir, f, 'entries.json');
  if (fs.existsSync(entriesPath)) {
    const stat = fs.statSync(entriesPath);
    if (stat.mtime.toISOString().startsWith(today)) {
      const content = fs.readFileSync(entriesPath, 'utf8');
      try {
        const json = JSON.parse(content);
        console.log(`Folder ${f}: resource = ${json.resource}, entries = ${json.entries?.length}`);
      } catch(e) {}
    }
  }
}
