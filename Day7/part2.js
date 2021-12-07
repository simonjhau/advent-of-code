import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const positions = input.split(',').map((item) => parseInt(item));

const getFuelUsage = (positions, pos) => {
  let fuel = 0;
  for (const position of positions) {
    const difference = Math.abs(position - pos);
    // 1 + 2 + 3 + ... + N can be simplified to (N - 1) / 2 * N
    fuel += ((difference + 1) / 2) * difference;
  }
  return fuel;
};

// Find the mean
const sum = positions.reduce((sum, val) => sum + val, 0);
const mean = Math.floor(sum / positions.length);
const fuel = getFuelUsage(positions, mean);
console.log(fuel);
