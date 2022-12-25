const text = await Deno.readTextFile("./input.txt");

const createKey = (row, col) => {
  return `${row},${col}`;
};

const elves = new Set();
const rows = text.split("\n");
rows.forEach((row, rowIdx) => {
  row.split("").forEach((col, colIdx) => {
    if (col === "#") {
      elves.add(createKey(rowIdx, colIdx));
    }
  });
});

const directions = [
  {
    check: [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
    ],
    move: { row: -1, col: 0 },
  },
  {
    check: [
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ],
    move: { row: 1, col: 0 },
  },
  {
    check: [
      { row: -1, col: -1 },
      { row: 0, col: -1 },
      { row: 1, col: -1 },
    ],
    move: { row: 0, col: -1 },
  },
  {
    check: [
      { row: -1, col: 1 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
    ],
    move: { row: 0, col: 1 },
  },
];
let direction = 0;

const allDirections = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: 1 },
  { row: 1, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: -1 },
  { row: 0, col: -1 },
];

const elvesAdjacent = (row, col, directionsToCheck) => {
  for (const direction of directionsToCheck) {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    const key = createKey(newRow, newCol);
    if (elves.has(key)) {
      return true;
    }
  }

  return false;
};

const NUM_ROUNDS = 1000;
for (let round = 1; round <= NUM_ROUNDS; round++) {
  const proposals = {};

  for (const elfString of elves) {
    const elf = elfString.split(",").map((x) => parseInt(x));
    if (!elvesAdjacent(elf[0], elf[1], allDirections)) {
      continue;
    }

    // Proposals
    const NUM_DIRECTIONS = 4;
    for (
      let directionOffset = 0;
      directionOffset < NUM_DIRECTIONS;
      directionOffset++
    ) {
      const directionIdx = (direction + directionOffset) % directions.length;
      if (!elvesAdjacent(elf[0], elf[1], directions[directionIdx].check)) {
        const newRow = elf[0] + directions[directionIdx].move.row;
        const newCol = elf[1] + directions[directionIdx].move.col;
        const proposalKey = createKey(newRow, newCol);
        if (proposals[proposalKey]) {
          proposals[proposalKey].push(elfString);
        } else {
          proposals[proposalKey] = [elfString];
        }
        break;
      }
    }
  }
  direction++;

  if (Object.keys(proposals).length === 0) {
    console.log(round);
    break;
  }

  for (const proposalKey in proposals) {
    const proposal = proposals[proposalKey];
    if (proposal.length === 1) {
      const originalKey = proposal[0];
      elves.delete(originalKey);
      elves.add(proposalKey);
    }
  }
}
