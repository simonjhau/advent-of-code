import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8');
const depths = data.split('\n').map((depth) => parseInt(depth));

let numIncreases = 0;
for (let i = 0; i < depths.length - 3; i++) {
  // Optimisation - windowing method of size 3 relies on difference between ith and i+3th values
  if (depths[i + 3] > depths[i]) {
    numIncreases++;
  }
}

console.log(numIncreases);
