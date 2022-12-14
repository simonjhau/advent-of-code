const text = await Deno.readTextFile("./test.txt");

let maxRow = 0;
let maxCol = 0;

const lines = text.split("\n");
const rockPaths = new Array(lines.length).fill().map(() => []);
lines.forEach((line, lineIdx) => {
  const rockCoords = line.split(" -> ");
  for (const coord of rockCoords) {
    const [col, row] = coord.split(",").map((c) => parseInt(c));
    maxCol = Math.max(col, maxCol);
    maxRow = Math.max(row, maxRow);
    rockPaths[lineIdx].push([row, col]);
  }
});

const grid = new Array(maxRow + 2)
  .fill()
  .map(() => new Array(maxCol * 2).fill("."));

const draw = (coord, symbol) => {
  const [row, col] = coord;
  grid[row][col] = symbol;
};

rockPaths.forEach((path) => {
  draw(path[0], "#");
  const curPos = path[0];
  for (let i = 1; i < path.length; i++) {
    const rowDiff = path[i][0] - curPos[0];
    const colDiff = path[i][1] - curPos[1];
    const dir = [
      rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff),
      colDiff === 0 ? 0 : colDiff / Math.abs(colDiff),
    ];

    while (curPos[0] !== path[i][0] || curPos[1] !== path[i][1]) {
      draw(curPos, "#");
      curPos[0] += dir[0];
      curPos[1] += dir[1];
    }
    draw(curPos, "#");
  }
});
console.log(grid.map((row) => row.join("").substring(450)));

const getNextPos = (curPos) => {
  if (grid[curPos[0] + 1][curPos[1]] === ".") {
    return [curPos[0] + 1, curPos[1]];
  }
  if (grid[curPos[0] + 1][curPos[1] - 1] === ".") {
    return [curPos[0] + 1, curPos[1] - 1];
  }
  if (grid[curPos[0] + 1][curPos[1] + 1] === ".") {
    return [curPos[0] + 1, curPos[1] + 1];
  }
  return curPos;
};

const SAND_SOURCE = [0, 500];
let unitsOfSand = 0;
while (true) {
  const curPos = [...SAND_SOURCE];
  let nextPos = getNextPos(curPos);
  while (nextPos[0] !== curPos[0] || nextPos[1] !== curPos[1]) {
    curPos[0] = nextPos[0];
    curPos[1] = nextPos[1];
    nextPos = getNextPos(curPos);
    if (nextPos[0] >= maxRow) {
      break;
    }
  }
  if (nextPos[0] >= maxRow) {
    console.log({ unitsOfSand });
    break;
  }
  draw(curPos, "o");
  unitsOfSand++;
}
console.log(grid.map((row) => row.join("").substring(450)));
