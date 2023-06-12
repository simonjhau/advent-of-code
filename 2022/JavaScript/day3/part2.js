const text = await Deno.readTextFile("./input.txt");

let prioritiesSum = 0;

const getIntersection = (arrayOfSet) => {
  const intersection = arrayOfSet.reduce((a, b) =>
    [...a].filter((c) => b.has(c))
  );
  if (intersection.length > 1) {
    throw new Error("Intersection length > 1");
  }
  return intersection[0];
};

const getPriority = (letter) => {
  const ascii = letter.charCodeAt(0);
  if (ascii > "a".charCodeAt(0)) {
    return ascii - "a".charCodeAt(0) + 1;
  }
  return ascii - "A".charCodeAt(0) + 27;
};

const NUM_ELVES_IN_GROUP = 3;
const elfGroup = new Array(NUM_ELVES_IN_GROUP);

const lines = text.split("\n");
for (let lineNum = 0; lineNum < lines.length; lineNum++) {
  elfGroup[lineNum % NUM_ELVES_IN_GROUP] = new Set(lines[lineNum].split(""));

  if (lineNum % 3 === 2) {
    const intersection = getIntersection(elfGroup);
    prioritiesSum += getPriority(intersection);
  }
}

console.log(prioritiesSum);
