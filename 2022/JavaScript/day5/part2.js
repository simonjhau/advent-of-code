const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");

let blankLineNum = 0;
while (lines[blankLineNum] !== "") {
  blankLineNum++;
}

const stackNumbers = lines[blankLineNum - 1].match(/\d+/g);
const numStacks = parseInt(stackNumbers[stackNumbers.length - 1]);
const stacks = new Array(numStacks).fill().map(() => []);

// Populate stacks
for (let lineNum = blankLineNum - 1; lineNum >= 0; lineNum--) {
  for (let stackNum = 0; stackNum < numStacks; stackNum++) {
    const item = lines[lineNum][1 + 4 * stackNum];
    if (item && item != " ") {
      stacks[stackNum].push(item);
    }
  }
}

// Rearrange crates
for (let lineNum = blankLineNum + 1; lineNum < lines.length; lineNum++) {
  const line = lines[lineNum];
  const instructions = line
    .match(/\d+/g)
    .map((instruction) => parseInt(instruction));

  const miniStack = [];
  for (let i = 0; i < instructions[0]; i++) {
    miniStack.push(stacks[instructions[1] - 1].pop());
  }
  for (let i = miniStack.length - 1; i >= 0; i--) {
    stacks[instructions[2] - 1].push(miniStack[i]);
  }
}

const top = stacks.map((stack) => stack[stack.length - 1]).join("");

console.log(top);
