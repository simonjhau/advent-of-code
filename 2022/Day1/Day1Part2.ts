const text = await Deno.readTextFile("./input.txt");

let current = 0;
const elves: number[] = [];

const lines = text.split("\n");
for (const line of lines) {
  if (line === "") {
    elves.push(current);
    current = 0;
  } else {
    current += parseInt(line, 10);
  }
}

elves.sort((a, b) => b - a);

let sum = 0;
for (let i = 0; i < 3; i++) {
  sum += elves[i];
}

console.log(sum);
