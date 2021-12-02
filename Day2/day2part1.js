const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const commands = input.split('\n').map((command) => {
  splitCommand = command.split(' ');
  return { direction: splitCommand[0], amount: parseInt(splitCommand[1]) };
});

let horizontal = 0;
let depth = 0;

for (command of commands) {
  switch (command.direction) {
    case 'forward':
      horizontal += command.amount;
      break;
    case 'up':
      depth -= command.amount;
      break;
    case 'down':
      depth += command.amount;
      break;
    default:
      break;
  }
}

console.log(horizontal * depth);
