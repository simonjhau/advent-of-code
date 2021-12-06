import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input
  .split('\n')
  .map((line) => line.match(/\d+/g).map((num) => parseInt(num)));

const gridSize = 1000; // 1000 for input, 10 for test
const grid = new Array(gridSize).fill().map(() => new Array(gridSize).fill(0));
let numWith2Overlaps = 0;

for (const [x1, y1, x2, y2] of lines) {
  let xDir = x1 === x2 ? 0 : (x2 - x1) / Math.abs(x2 - x1);
  let yDir = y1 === y2 ? 0 : (y2 - y1) / Math.abs(y2 - y1);

  const lineLength = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) + 1;

  for (let step = 0; step < lineLength; step++) {
    grid[y1 + step * yDir][x1 + step * xDir] += 1;
    if (grid[y1 + step * yDir][x1 + step * xDir] === 2) {
      numWith2Overlaps++;
    }
  }
}

console.log(numWith2Overlaps);
