const text = await Deno.readTextFile("./input.txt");

const createOperation = (op) => {
  return (worry) => {
    const operand = op[2] === "old" ? worry : parseInt(op[2]);
    if (op[1] === "*") {
      return worry * operand;
    }
    return worry + operand;
  };
};

const monkeys = [];
let commonDivisor = 1;
const sections = text.split("\n\n");
for (const section of sections) {
  const lines = section.split("\n");
  const items = lines[1].match(/\d+/g).map((item) => parseInt(item));
  const op = createOperation(lines[2].split("= ")[1].split(" "));
  const divisibleBy = parseInt(lines[3].match(/\d+/g));
  commonDivisor *= divisibleBy;
  const ifTrue = parseInt(lines[4].match(/\d+/g));
  const ifFalse = parseInt(lines[5].match(/\d+/g));
  const nextMonkey = (bool) => (bool ? ifTrue : ifFalse);
  const monkey = { items, op, divisibleBy, nextMonkey };
  monkeys.push(monkey);
}

const NUM_ROUNDS = 10000;
const relief = false;
const numInspections = new Array(monkeys.length).fill(0);
for (let roundNum = 0; roundNum < NUM_ROUNDS; roundNum++) {
  monkeys.forEach((monkey, monkeyIdx) => {
    const { items, op, divisibleBy, nextMonkey } = monkey;
    while (items.length > 0) {
      numInspections[monkeyIdx]++;
      const item = items.shift();
      let worry = op(item);
      if (relief) {
        worry = Math.floor(worry / 3);
      } else {
        worry %= commonDivisor;
      }
      const nextMonkeyIdx = nextMonkey(worry % divisibleBy === 0);
      monkeys[nextMonkeyIdx].items.push(worry);
    }
  });
}

numInspections.sort((a, b) => b - a);
const monkeyBusiness = numInspections[0] * numInspections[1];
console.log(monkeyBusiness);
