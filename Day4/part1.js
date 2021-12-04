import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('input.txt');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let drawnNumbers = [];
const boards = [];
let boardIdx = -1;

// Parse file
let lineNum = 0;
for await (const line of rl) {
  if (lineNum === 0) {
    // Parse 1st line drawn numbers
    drawnNumbers = line.split(',').map((num) => parseInt(num));
  } else if (line === '') {
    // Next board
    boards.push({ board: [], won: false });
    boardIdx++;
  } else {
    // Parse boards
    boards[boardIdx].board.push(
      line
        .trim()
        .split(/\s+/)
        .map((val) => {
          return {
            value: parseInt(val),
            marked: false,
          };
        })
    );
  }
  lineNum++;
}

// Mark boards when a number is drawn
const markBoards = (boards, drawnNumber) => {
  for (let boardIdx = 0; boardIdx < boards.length; boardIdx++) {
    const board = boards[boardIdx];
    for (let rowIdx = 0; rowIdx < board.board.length; rowIdx++) {
      for (let colIdx = 0; colIdx < board.board.length; colIdx++) {
        const cell = board.board[rowIdx][colIdx];
        if (cell.value === drawnNumber) {
          cell.marked = true;

          // Check if board is a winner
          if (checkWinner(board, rowIdx, colIdx) === true) {
            board.won = true;
            winningBoards.push({
              boardNum: boardIdx + 1,
              score: winningScore(board, drawnNumber),
            });
          }
        }
      }
    }
  }
};

// Calculate winning score
const winningScore = (board, drawnNumber) => {
  let score = 0;
  for (const row of board.board) {
    for (const item of row) {
      if (!item.marked) {
        score += item.value;
      }
    }
  }
  return score * drawnNumber;
};

// Check for a winner
const winningBoards = [];
const checkWinner = (board, markedRowIdx, markedColIdx) => {
  let winningBoard = true;

  // Check for winning row
  for (let colIdx = 0; colIdx < board.board.length; colIdx++) {
    if (board.board[markedRowIdx][colIdx].marked === false) {
      winningBoard = false;
      break;
    }
  }

  if (!winningBoard) {
    // Check for winning column
    winningBoard = true;
    for (let rowIdx = 0; rowIdx < board.board.length; rowIdx++) {
      if (board.board[rowIdx][markedColIdx].marked === false) {
        winningBoard = false;
        break;
      }
    }
  }

  return winningBoard;
};

// Let's play bingo!
for (const drawnNumber of drawnNumbers) {
  markBoards(boards, drawnNumber);
  if (winningBoards.length > 0) {
    console.log(
      `Winner is board ${winningBoards[0].boardNum} with ${winningBoards[0].score} points`
    );
    break;
  }
}
