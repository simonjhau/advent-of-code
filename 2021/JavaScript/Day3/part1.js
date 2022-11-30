import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const diagnostics = input.split('\n');
const numBits = diagnostics[0].length;
let gammaRateStr = '';

for (let i = 0; i < numBits; i++) {
  // Count the number of '1's in this column
  let numOnes = 0;
  for (const diag of diagnostics) {
    if (diag[i] === '1') {
      numOnes++;
    }
  }

  gammaRateStr += numOnes >= diagnostics.length / 2 ? '1' : '0';
}

const gammaRate = parseInt(gammaRateStr, 2);
const epsilonRate = ~gammaRate & (2 ** numBits - 1);

console.log(`Gamma Rate: ${gammaRate}`);
console.log(`Epsilon Rate: ${epsilonRate}`);
console.log(`Power Consumption: ${gammaRate * epsilonRate}`);
