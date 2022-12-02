const text = await Deno.readTextFile("./input.txt");

const gameActions = {
  X: { action: "lose", score: 0 },
  Y: { action: "tie", score: 3 },
  Z: { action: "win", score: 6 },
};

const oppMoveScores = {
  A: { win: 2, tie: 1, lose: 3 },
  B: { win: 3, tie: 2, lose: 1 },
  C: { win: 1, tie: 3, lose: 2 },
};

let total = 0;

const lines = text.split("\n");
for (const line of lines) {
  const [opp, action] = line.split(" ");
  total += gameActions[action].score;
  total += oppMoveScores[opp][gameActions[action].action];
}

console.log(total);
