const text = await Deno.readTextFile("./input.txt");

const sections = text.split("\n\n");
const lines = sections[0].split("\n");
let maxWidth = 0;
for (const line of lines) {
  maxWidth = Math.max(line.length, maxWidth);
}
const grid = new Array(lines.length)
  .fill()
  .map(() => new Array(maxWidth).fill(" "));
lines.forEach((line, lineIdx) => {
  line.split("").forEach((letter, letterIdx) => {
    grid[lineIdx][letterIdx] = letter;
  });
});

const directions = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: -1, col: 0 },
];
const right = 0;

let curPos = { row: 0, col: -1, dir: right };
for (let col = 0; col < grid[0].length; col++) {
  if (grid[0][col] === ".") {
    curPos.col = col;
    break;
  }
}

const pathToFollow = sections[1].match(/\d+|L|R/g);

const getNextDirection = (curPos, instruction) => {
  if (instruction === "R") {
    return (curPos.dir + 1) % directions.length;
  }
  return (curPos.dir + directions.length - 1) % directions.length;
};

const getNextPos = (pos, value) => {
  const curPos = { ...pos };
  const nextPos = { ...pos };
  while (value > 0) {
    nextPos.row =
      (nextPos.row + grid.length + directions[nextPos.dir].row) % grid.length;
    nextPos.col =
      (nextPos.col + grid[0].length + directions[nextPos.dir].col) %
      grid[0].length;

    while (grid[nextPos.row][nextPos.col] === " ") {
      nextPos.row =
        (nextPos.row + grid.length + directions[nextPos.dir].row) % grid.length;
      nextPos.col =
        (nextPos.col + grid[0].length + directions[nextPos.dir].col) %
        grid[0].length;
    }
    if (grid[nextPos.row][nextPos.col] === "#") {
      break;
    }

    curPos.row = nextPos.row;
    curPos.col = nextPos.col;
    value--;
  }
  return curPos;
};

pathToFollow.forEach((instruction) => {
  const value = parseInt(instruction);
  if (isNaN(value)) {
    curPos.dir = getNextDirection(curPos, instruction);
  } else {
    curPos = getNextPos(curPos, value);
  }
});

const password = 1000 * (curPos.row + 1) + 4 * (curPos.col + 1) + curPos.dir;
console.log({ password });
