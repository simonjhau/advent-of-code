const text = await Deno.readTextFile("./input.txt");

const createKey = (row, col) => {
  return `${row},${col}`;
};

const directions = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

let numCols = 1;
const startBlizzards = new Map();
const rows = text.split("\n");
rows.forEach((row, rowIdx) => {
  const cols = row.split("");
  numCols = cols.length;
  cols.forEach((col, colIdx) => {
    const key = createKey(rowIdx, colIdx);
    if (col !== "#" && col !== ".") {
      startBlizzards.set(key, [col]);
    }
  });
});

const getNextPosition = (blizzard, dir) => {
  const direction = directions[dir];
  let newRow = blizzard[0] + direction[0];
  let newCol = blizzard[1] + direction[1];
  if (newRow < 1) {
    newRow = newRow + rows.length - 2;
  } else if (newRow >= rows.length - 1) {
    newRow = (newRow + 2) % rows.length;
  }
  if (newCol < 1) {
    newCol = newCol + numCols - 2;
  } else if (newCol >= numCols - 1) {
    newCol = (newCol + 2) % numCols;
  }
  return [newRow, newCol];
};

// Precompute all the blizzard states
const period = (rows.length - 2) * (numCols - 2);
const blizzardStates = new Map();
const seenBlizzardStates = new Set();
let blizzards = startBlizzards;

for (let min = 0; min < period; min++) {
  const blizzardsCopy = new Map(
    JSON.parse(JSON.stringify(Array.from(blizzards)))
  );
  const newBlizzards = new Map();
  blizzardsCopy.forEach((blizzardDirections, blizzardKey) => {
    const blizzard = blizzardKey.split(",").map((x) => parseInt(x));
    while (blizzardDirections.length > 0) {
      const direction = blizzardDirections.shift();
      const nextPos = getNextPosition(blizzard, direction);
      const newKey = createKey(nextPos[0], nextPos[1]);
      if (newBlizzards.get(newKey)) {
        newBlizzards.get(newKey).push(direction);
      } else {
        newBlizzards.set(newKey, [direction]);
      }
    }
  });

  blizzardStates.set(min, newBlizzards);

  seenBlizzardStates.add(JSON.stringify(Array.from(blizzards)));
  blizzards = newBlizzards;
}

// throw new Error();
const elfDirections = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (start, end, startMin) => {
  const queue = [{ elfPos: start, min: startMin }];
  const statesSeen = new Set();
  while (queue.length > 0) {
    const { elfPos, min } = queue.shift();
    if (elfPos[0] === end[0] && elfPos[1] === end[1]) {
      return min;
    }

    if (statesSeen.has(JSON.stringify({ elfPos, min }))) {
      continue;
    }

    for (const direction of elfDirections) {
      const newRow = elfPos[0] + direction[0];
      const newCol = elfPos[1] + direction[1];
      const key = createKey(newRow, newCol);
      if (
        (newRow === start[0] && newCol === start[1]) ||
        (newRow === end[0] && newCol === end[1]) ||
        (newRow > 0 &&
          newRow < rows.length - 1 &&
          newCol > 0 &&
          newCol < numCols - 1 &&
          !blizzardStates.get(min % period).has(key))
      ) {
        queue.push({
          elfPos: [newRow, newCol],
          min: min + 1,
          distance:
            Math.abs(end[0] - newRow) + Math.abs(end[1] - newCol) + min + 1,
        });
      }
    }
    queue.sort((a, b) => a.distance - b.distance);
    statesSeen.add(JSON.stringify({ elfPos, min }));
  }
};

const start = [0, 1];
const end = [rows.length - 1, numCols - 2];
const min1 = bfs(start, end, 0);
console.log(min1);
const min2 = bfs(end, start, min1);
const min3 = bfs(start, end, min2);
console.log(min3);
