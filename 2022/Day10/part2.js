const text = await Deno.readTextFile("./input.txt");

const SCREEN_HEIGHT = 6;
const SCREEN_WIDTH = 40;
const pixels = new Array(SCREEN_HEIGHT)
  .fill()
  .map(() => new Array(SCREEN_WIDTH).fill("."));

let cycle = 0;
let register = 1;

const DrawPixel = (cycle) => {
  if (Math.abs(register - (cycle % SCREEN_WIDTH)) <= 1) {
    pixels[Math.floor(cycle / SCREEN_WIDTH)][cycle % SCREEN_WIDTH] = "#";
  }
};

const drawPixelAndIncrementCycle = (n) => {
  for (let i = 0; i < n; i++) {
    DrawPixel(cycle);
    cycle++;
  }
};

const lines = text.split("\n");
for (const line of lines) {
  const instructions = line.split(" ");
  const instruction = instructions[0];
  if (instruction === "noop") {
    drawPixelAndIncrementCycle(1);
  } else {
    const amount = parseInt(instructions[1]);
    drawPixelAndIncrementCycle(2);
    register += amount;
  }
}

for (const row of pixels) {
  console.log(row.join(""));
}
