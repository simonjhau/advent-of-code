const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const commands = input.split('\n').map((command) => {
  splitCommand = command.split(' ');
  return { command: splitCommand[0], units: splitCommand[1] };
});

console.log(commands[0]);
