const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');
let depths = data.split('\n').map((depth) => parseInt(depth));

let numIncreases = 0;
for (let i = 0; i < depths.length - 3; i++) {
  if (depths[i + 3] > depths[i]) {
    numIncreases++;
  }
}

console.log(numIncreases);
