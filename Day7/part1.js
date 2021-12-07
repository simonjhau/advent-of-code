import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const positions = input.split(',').map((item) => parseInt(item));

const getFuelUsage = (positions, pos) => {
  let fuel = 0;
  for (const position of positions) {
    fuel += Math.abs(position - pos);
  }
  return fuel;
};

// Find the median
positions.sort((a, b) => a - b);
const median = positions[Math.round(positions.length / 2)];
console.log(median);
const fuel = getFuelUsage(positions, median);
console.log(fuel);
