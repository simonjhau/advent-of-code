import fs from 'fs';
import readline from 'readline';
import util from 'util';

const fileStream = fs.createReadStream('input.txt');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let drawnNumbers = [];
const boards = [];
let boardIdx = -1;
const winners = [];

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
    const row = boards[boardIdx].board.push(
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
  for (const board of boards) {
    for (const row of board.board) {
      for (let item of row) {
        if (item.value === drawnNumber) {
          item.marked = true;
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
const checkWinner = (boards, drawnNumber) => {
  for (let boardIdx = 0; boardIdx < boards.length; boardIdx++) {
    const board = boards[boardIdx];
    let winningBoard = false;

    if (board.won === false) {
      // Check for winning row
      for (
        let rowIdx = 0;
        rowIdx < board.board.length && !winningBoard;
        rowIdx++
      ) {
        winningBoard = true;
        for (let colIdx = 0; colIdx < board.board.length; colIdx++) {
          if (board.board[rowIdx][colIdx].marked === false) {
            winningBoard = false;
            break;
          }
        }
      }

      if (!winningBoard) {
        // Check for winning column
        for (
          let colIdx = 0;
          colIdx < board.board.length && !winningBoard;
          colIdx++
        ) {
          winningBoard = true;
          for (let rowIdx = 0; rowIdx < board.board.length; rowIdx++) {
            if (board.board[rowIdx][colIdx].marked === false) {
              winningBoard = false;
              break;
            }
          }
        }
      }

      if (winningBoard) {
        board.won = true;
        winners.push({
          boardNum: boardIdx + 1,
          score: winningScore(board, drawnNumber),
        });
      }
    }
  }
};

// Let's play bingo!
for (const drawnNumber of drawnNumbers) {
  markBoards(boards, drawnNumber);
  checkWinner(boards, drawnNumber);
}

console.log(util.inspect(winners, { maxArrayLength: null }));
