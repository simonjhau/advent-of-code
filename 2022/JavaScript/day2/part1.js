const text = await Deno.readTextFile("./input.txt");

const moves = {
  X: { score: 1, beats: "C", tiesWith: "A" },
  Y: { score: 2, beats: "A", tiesWith: "B" },
  Z: { score: 3, beats: "B", tiesWith: "C" },
};

let total = 0;

const lines = text.split("\n");
for (const line of lines) {
  const [opp, you] = line.split(" ");
  total += moves[you].score;
  if (opp === moves[you].beats) {
    total += 6;
  } else if (opp === moves[you].tiesWith) {
    total += 3;
  }
}

console.log(total);
