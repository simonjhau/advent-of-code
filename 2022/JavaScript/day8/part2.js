const text = await Deno.readTextFile("./input.txt");

const grid = [];

const lines = text.split("\n");
for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  grid[lineIdx] = [];
  for (let treeIdx = 0; treeIdx < lines[lineIdx].length; treeIdx++) {
    grid[lineIdx].push(parseInt(lines[lineIdx][treeIdx]));
  }
}

let bestScenicScore = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    const tree = grid[row][col];

    // From left to right
    let l2r = col === grid[0].length - 1 ? 0 : 1;
    while (col + l2r < grid[0].length - 1 && grid[row][col + l2r] < tree) {
      l2r++;
    }

    // From right to left
    let r2l = col === 0 ? 0 : 1;
    while (col - r2l > 0 && grid[row][col - r2l] < tree) {
      r2l++;
    }

    // From top to bottom
    let t2b = row === grid.length - 1 ? 0 : 1;
    while (row + t2b < grid.length - 1 && grid[row + t2b][col] < tree) {
      t2b++;
    }

    // From bottom to top
    let b2t = row === 0 ? 0 : 1;
    while (row - b2t > 0 && grid[row - b2t][col] < tree) {
      b2t++;
    }

    const scenicScore = l2r * r2l * t2b * b2t;
    bestScenicScore = Math.max(scenicScore, bestScenicScore);
  }
}

console.log(bestScenicScore);
