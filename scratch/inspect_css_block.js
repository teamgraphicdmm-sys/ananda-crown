const fs = require('fs');
let html = fs.readFileSync('scratch/reconstructed_271952.html', 'utf8');

console.log(html.slice(33000, 34500));
