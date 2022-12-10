const text = await Deno.readTextFile("./input.txt");

const grid = [];

const lines = text.split("\n");
for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  grid[lineIdx] = [];
  for (let treeIdx = 0; treeIdx < lines[lineIdx].length; treeIdx++) {
    grid[lineIdx].push(parseInt(lines[lineIdx][treeIdx]));
  }
}

const getViewingDistance = (row, col, dr, dc) => {
  let r = row + dr;
  let c = col + dc;
  let viewingDistance = 0;
  while (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
    viewingDistance++;
    if (grid[r][c] >= grid[row][col]) {
      break;
    }
    r += dr;
    c += dc;
  }
  return viewingDistance;
};

let bestScenicScore = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    const scenicScore =
      getViewingDistance(row, col, 1, 0) *
      getViewingDistance(row, col, 0, 1) *
      getViewingDistance(row, col, -1, 0) *
      getViewingDistance(row, col, 0, -1);

    bestScenicScore = Math.max(scenicScore, bestScenicScore);
  }
}

console.log(bestScenicScore);
