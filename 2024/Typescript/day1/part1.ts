const lines = Deno.readTextFileSync("test.txt").split("\n");
const left: number[] = [];
const right: number[] = [];

for (const line of lines) {
  const [l, r] = line.split("   ").map((str) => parseInt(str, 10));
  left.push(l);
  right.push(r);
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let sum = 0;
for (let i = 0; i < left.length; i++) {
  sum += Math.abs(left[i] - right[i]);
}
console.log(sum);
