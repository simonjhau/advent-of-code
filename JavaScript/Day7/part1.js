import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const positions = input.split(',').map((item) => parseInt(item));

const getFuelUsage = (positions, pos) => {
  return positions.reduce(
    (fuel, position) => fuel + Math.abs(position - pos),
    0
  );
};

// Find the median
positions.sort((a, b) => a - b);
const median = positions[Math.round(positions.length / 2)];
const fuel = getFuelUsage(positions, median);
console.log(fuel);
