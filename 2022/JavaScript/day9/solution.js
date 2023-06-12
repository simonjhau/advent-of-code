const text = await Deno.readTextFile("./input.txt");

const NUMBER_OF_KNOTS = 10;
const knots = new Array(NUMBER_OF_KNOTS).fill().map(() => {
  return { x: 0, y: 0 };
});
const visited = new Set();
visited.add(JSON.stringify(knots[knots.length - 1]));

const moveKnot = (i) => {
  const [dx, dy] = [knots[i - 1].x - knots[i].x, knots[i - 1].y - knots[i].y];
  if ((Math.abs(dx) > 1 && dy !== 0) || (Math.abs(dy) > 1 && dx !== 0)) {
    knots[i].x += dx / Math.abs(dx);
    knots[i].y += dy / Math.abs(dy);
  } else if (Math.abs(dx) > 1) {
    knots[i].x += dx / Math.abs(dx);
  } else if (Math.abs(dy) > 1) {
    knots[i].y += dy / Math.abs(dy);
  }
};

const lines = text.split("\n");
for (const line of lines) {
  const motion = line.split(" ");
  const direction = motion[0];
  const amount = parseInt(motion[1]);

  for (let i = 0; i < amount; i++) {
    // Move head
    switch (direction) {
      case "U":
        knots[0].y += 1;
        break;
      case "D":
        knots[0].y -= 1;
        break;
      case "L":
        knots[0].x -= 1;
        break;
      case "R":
        knots[0].x += 1;
        break;
      default:
        throw new Error("Bad direction");
    }

    // Move other knots
    for (let knotIdx = 1; knotIdx < knots.length; knotIdx++) {
      moveKnot(knotIdx);
    }

    // Add tail to visited positions
    visited.add(JSON.stringify(knots[knots.length - 1]));
  }
}

console.log(visited.size);
