const fs = require('fs');
let html = fs.readFileSync('C:/Users/Admin/AppData/Roaming/Code/User/History/-6d38c520/smNC.html', 'utf8');
const lines = html.split('\n');

for (let i = 420; i < 460; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
