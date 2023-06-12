const text = await Deno.readTextFile("./input.txt");

let max = 0;
let current = 0;

const lines = text.split("\n");
for (const line of lines) {
  if (line === "") {
    current = 0;
  } else {
    current += parseInt(line, 10);
    max = Math.max(current, max);
  }
}

console.log(max);
