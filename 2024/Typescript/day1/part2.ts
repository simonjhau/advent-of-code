const lines = Deno.readTextFileSync("input.txt").split(
  "\n",
);
const left: number[] = [];
const right = new Map<number, number>();

for (const line of lines) {
  const [l, r] = line.split("   ").map((str) => parseInt(str));
  left.push(l);

  const prev = right.get(r) ?? 0;
  right.set(r, prev + 1);
}

let sum = 0;
for (const l of left) {
  sum += l * (right.get(l) ?? 0);
}
console.log(sum);
