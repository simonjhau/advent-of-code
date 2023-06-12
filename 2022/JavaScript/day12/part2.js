const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");
const grid = new Array(lines.length);
const start = [-1, -1];
lines.forEach((line, lineIdx) => {
  grid[lineIdx] = line.split("").map((letter, letterIdx) => {
    let height = letter.charCodeAt() - "a".charCodeAt();
    if (letter === "E") {
      start[0] = lineIdx;
      start[1] = letterIdx;
      height = 25;
    }
    return {
      letter,
      height,
      visited: false,
    };
  });
});

const queue = [[...start, 0]];
while (queue.length > 0) {
  const [row, col, steps] = queue.shift();

  if (grid[row][col].visited) continue;

  if (grid[row][col].height === 0) {
    console.log(`Min distance: ${steps}`);
    break;
  }

  grid[row][col].visited = true;

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  directions.forEach((direction) => {
    const newRow = row + direction[0];
    const newCol = col + direction[1];
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      grid[newRow][newCol].height >= grid[row][col].height - 1
    ) {
      queue.push([newRow, newCol, steps + 1]);
    }
  });
}
