const text = await Deno.readTextFile("./input.txt");

const grid = [];

const lines = text.split("\n");
for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  grid[lineIdx] = [];
  for (let treeIdx = 0; treeIdx < lines[lineIdx].length; treeIdx++) {
    grid[lineIdx].push(parseInt(lines[lineIdx][treeIdx]));
  }
}

const isVisible = (row, col, dr, dc) => {
  let r = row + dr;
  let c = col + dc;
  while (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
    if (grid[r][c] >= grid[row][col]) {
      return false;
    }
    r += dr;
    c += dc;
  }
  return true;
};

let numVisible = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (
      isVisible(row, col, 1, 0) ||
      isVisible(row, col, 0, 1) ||
      isVisible(row, col, -1, 0) ||
      isVisible(row, col, 0, -1)
    ) {
      numVisible++;
    }
  }
}

console.log(numVisible);
