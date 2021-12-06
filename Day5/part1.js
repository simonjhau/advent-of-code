import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input
  .split('\n')
  .map((line) =>
    line
      .split(' -> ')
      .map((coord) => coord.split(',').map((num) => parseInt(num)))
  );

const start = 0;
const end = 1;
const x = 0;
const y = 1;

const gridSize = 1000; // 1000 for input, 10 for test
const grid = new Array(gridSize).fill().map(() => new Array(gridSize).fill(0));
let numWith2Overlaps = 0;

for (const line of lines) {
  if (line[start][x] === line[end][x] || line[start][y] === line[end][y]) {
    let xDir = 0;
    if (line[start][x] < line[end][x]) {
      xDir = 1;
    } else if (line[start][x] > line[end][x]) {
      xDir = -1;
    }

    let yDir = 0;
    if (line[start][y] < line[end][y]) {
      yDir = 1;
    } else if (line[start][y] > line[end][y]) {
      yDir = -1;
    }

    const lineLength =
      Math.max(
        Math.abs(line[start][x] - line[end][x]),
        Math.abs(line[start][y] - line[end][y])
      ) + 1;

    let step = 0;
    while (step < lineLength) {
      grid[line[start][y] + step * yDir][line[start][x] + step * xDir] += 1;
      if (
        grid[line[start][y] + step * yDir][line[start][x] + step * xDir] === 2
      ) {
        numWith2Overlaps++;
      }
      step++;
    }
  }
}

console.log(numWith2Overlaps);
