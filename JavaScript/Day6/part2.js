import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');
const list = input.split(',').map((item) => parseInt(item));

const days = 80;

// Work out for each fish how many come off it

const numFish = [];

for (let fish of input) {
}

for (let day = 0; day < days; day++) {
  const length = list.length;
  for (let i = 0; i < length; i++) {
    list[i]--;
    if (list[i] === -1) {
      list[i] = 6;
      list.push(8);
    }
  }
}

console.log(list.length);
