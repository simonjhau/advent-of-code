const jetPattern = await Deno.readTextFile("./input.txt");

// The pattern loops every 1750 for this input (found by printing )

const WIDTH = 7;
const chamber = [[".", "#", ".", ".", ".", ".", "."]];
const rockPattern = [
  [["#", "#", "#", "#"]],
  [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."],
  ],
  [
    [".", ".", "#"],
    [".", ".", "#"],
    ["#", "#", "#"],
  ],
  [["#"], ["#"], ["#"], ["#"]],
  [
    ["#", "#"],
    ["#", "#"],
  ],
];

const drawRock = (rock, topLeftCoord) => {
  rock.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== ".")
        chamber[topLeftCoord[0] + rowIdx][topLeftCoord[1] + colIdx] = col;
    });
  });
};

let prevRockIdx = 0;
let prevJetIdx = 0;
let prevChamberHeight = 0;

const NUM_ROCKS = 643; // 1 trillion - 12 0s
const startingRock = 2;
let jetIdx = 639;
let truncatedRows = 0;
for (
  let rockIdx = startingRock;
  rockIdx < startingRock + NUM_ROCKS;
  rockIdx++
) {
  console.log(rockIdx);
  const rockType = rockIdx % rockPattern.length;
  const rock = rockPattern[rockType];

  // Rock starts at 3 higher than current height + height of rock itself
  for (let i = 0; i < 3 + rock.length; i++) {
    chamber.unshift(new Array(WIDTH).fill("."));
  }

  // Add in the rock
  const OFFSET = 2;
  const topLeftCoord = [0, OFFSET];
  while (true) {
    // Move horizontally
    const jet = jetPattern[++jetIdx % jetPattern.length];
    if (jet === ">") {
      let canMove = true;
      for (let rowIdx = 0; rowIdx < rock.length; rowIdx++) {
        let rhs = topLeftCoord[1] + rock[rowIdx].length;

        // Special case for +
        if (rockType === 1 && (rowIdx === 0 || rowIdx === 2)) {
          rhs--;
        }

        if (rhs >= WIDTH || chamber[topLeftCoord[0] + rowIdx][rhs] !== ".") {
          canMove = false;
          break;
        }
      }
      if (canMove) {
        topLeftCoord[1]++;
      }
    } else {
      // <
      let canMove = true;
      for (let rowIdx = 0; rowIdx < rock.length; rowIdx++) {
        let lhs = topLeftCoord[1] - 1;

        // Special cases for + and _|
        if (rockType === 1 && (rowIdx === 0 || rowIdx === 2)) {
          lhs++;
        } else if (rockType === 2 && rowIdx < 2) {
          lhs += 2;
        }

        if (lhs >= WIDTH || chamber[topLeftCoord[0] + rowIdx][lhs] !== ".") {
          canMove = false;
          break;
        }
      }
      if (canMove) {
        topLeftCoord[1]--;
      }
    }

    // Move vertically
    let canMove = true;
    for (let colIdx = 0; colIdx < rock[0].length; colIdx++) {
      let rowToCheck = topLeftCoord[0] + rock.length;

      // Special case for +
      if (rockType === 1 && (colIdx === 0 || colIdx === 2)) {
        rowToCheck--;
      }

      if (
        rowToCheck >= chamber.length ||
        chamber[rowToCheck][topLeftCoord[1] + colIdx] !== "."
      ) {
        canMove = false;
        break;
      }
    }

    if (canMove) {
      topLeftCoord[0]++;
    } else {
      break;
    }
  }

  drawRock(rock, topLeftCoord);

  for (let rowIdx = chamber.length - 1; rowIdx >= 0; rowIdx--) {
    let emptyRow = true;
    for (const col of chamber[rowIdx]) {
      if (col !== ".") {
        emptyRow = false;
        continue;
      }
    }
    if (emptyRow) {
      chamber.splice(0, rowIdx + 1);
      break;
    }
  }

  for (let rowIdx = chamber.length - 1; rowIdx >= 0; rowIdx--) {
    let fullRow = true;
    // console.log("chamber", chamber[rowIdx]);
    for (const col of chamber[rowIdx]) {
      if (col !== "#") {
        fullRow = false;
        continue;
      }
    }
    if (fullRow) {
      truncatedRows += chamber.length - rowIdx;
      console.log(
        `Full: ${rockIdx},${jetIdx},${rockIdx - prevRockIdx}, ${
          jetIdx - prevJetIdx
        },${chamber.length}, ${chamber.length - prevChamberHeight}`
      );
      prevRockIdx = rockIdx;
      prevJetIdx = jetIdx;
      prevChamberHeight = chamber.length;
      chamber.splice(rowIdx);
      break;
    }
  }
}

console.log(truncatedRows + chamber.length);
