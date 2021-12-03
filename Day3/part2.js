import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const diagnostics = input.split('\n');
const numBits = diagnostics[0].length;

let oxygenDiags = diagnostics;
for (let i = 0; i < numBits && oxygenDiags.length > 1; i++) {
  // Count the number of 1's in this column
  let numOnes = 0;
  for (const diag of oxygenDiags) {
    if (diag[i] === '1') {
      numOnes++;
    }
  }
  let mostPopularValue = numOnes >= oxygenDiags.length / 2 ? '1' : '0';
  oxygenDiags = oxygenDiags.filter((diag) => diag[i] === mostPopularValue);
}
const oxygenGeneratorRating = parseInt(oxygenDiags[0], 2);
console.log(`Oxygen Generator Rating: ${oxygenDiags[0]}`);

let co2Diags = diagnostics;
for (let i = 0; i < numBits && co2Diags.length > 1; i++) {
  // Count the number of 1's in this column
  let numOnes = 0;
  for (const diag of co2Diags) {
    if (diag[i] === '1') {
      numOnes++;
    }
  }
  let leastPopularValue = numOnes >= co2Diags.length / 2 ? '0' : '1';
  co2Diags = co2Diags.filter((diag) => diag[i] === leastPopularValue);
}
const co2ScrubberRating = parseInt(co2Diags[0], 2);
console.log(`CO2 Scrubber Rating: ${co2Diags[0]}`);

const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
console.log(`Life Support Rating: ${lifeSupportRating}`);
