const text = await Deno.readTextFile("./input.txt");

const interestingCycles = new Set([20, 60, 100, 140, 180, 220]);
let cycle = 0;
let register = 1;
let sum = 0;

const incrementCycle = (amount) => {
  for (let i = 0; i < amount; i++) {
    cycle++;
    if (interestingCycles.has(cycle)) {
      sum += cycle * register;
    }
  }
};

const lines = text.split("\n");
for (const line of lines) {
  const instructions = line.split(" ");
  const instruction = instructions[0];
  if (instruction === "noop") {
    incrementCycle(1);
  } else {
    const amount = parseInt(instructions[1]);
    incrementCycle(2);
    register += amount;
  }
}

console.log(sum);
