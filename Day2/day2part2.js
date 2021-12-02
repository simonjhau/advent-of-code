const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const commands = input.split('\n').map((command) => {
  splitCommand = command.split(' ');
  return { direction: splitCommand[0], amount: parseInt(splitCommand[1]) };
});

let horizontal = 0;
let depth = 0;
let aim = 0;

for (const command of commands) {
  switch (command.direction) {
    case 'forward':
      horizontal += command.amount;
      depth += aim * command.amount;
      break;
    case 'up':
      aim -= command.amount;
      break;
    case 'down':
      aim += command.amount;
      break;
    default:
      // Case should not happen.  Do nothing
      break;
  }
}

console.log(horizontal * depth);
