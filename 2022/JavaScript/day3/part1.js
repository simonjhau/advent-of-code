const text = await Deno.readTextFile("./input.txt");

let prioritiesSum = 0;

const getIntersection = (setA, setB) => {
  const intersection = [...setA].filter((element) => setB.has(element));
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

const lines = text.split("\n");
for (const line of lines) {
  const compartment1 = new Set(line.substring(0, line.length / 2).split(""));
  const compartment2 = new Set(
    line.substring(line.length / 2, line.length).split("")
  );
  const intersection = getIntersection(compartment1, compartment2);
  prioritiesSum += getPriority(intersection);
}

console.log(prioritiesSum);
