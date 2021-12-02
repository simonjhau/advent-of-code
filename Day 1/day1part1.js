const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');
const depths = data.split('\n').map((depth) => parseInt(depth));

let numIncreases = 0;
for (let i = 1; i < depths.length; i++) {
  if (depths[i] > depths[i - 1]) {
    numIncreases++;
  }
}

console.log(numIncreases);
