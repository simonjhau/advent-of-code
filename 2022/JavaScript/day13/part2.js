const text = await Deno.readTextFile("./input.txt");

const RIGHT_ORDER = 1;
const SAME = 0;
const WRONG_ORDER = -1;

const checkPairs = (left, right) => {
  if (left === undefined) {
    return RIGHT_ORDER;
  }
  if (right === undefined) {
    return WRONG_ORDER;
  }

  if (typeof left === typeof right) {
    if (Array.isArray(left) && Array.isArray(right)) {
      const arrLength = right.length > left.length ? right.length : left.length;
      for (let i = 0; i < arrLength; i++) {
        const check = checkPairs(left[i], right[i]);
        if (check !== SAME) {
          return check;
        }
      }
      return SAME;
    }

    // Number
    if (left === right) return SAME;
    if (left < right) return RIGHT_ORDER;
    return WRONG_ORDER;
  }

  // One side is array, the other is a number
  if (Array.isArray(left)) {
    return checkPairs(left, [right]);
  }
  return checkPairs([left], right);
};

const packets = [];
const lines = text.split("\n");
lines.push("[[2]]");
lines.push("[[6]]");
for (const line of lines) {
  if (line !== "") {
    packets.push(JSON.parse(line));
  }
}

packets.sort((a, b) => checkPairs(b, a));

let decoderKey = 1;
packets.forEach((packet, idx) => {
  if (
    JSON.stringify(packet) === "[[2]]" ||
    JSON.stringify(packet) === "[[6]]"
  ) {
    decoderKey *= idx + 1;
  }
});

console.log(decoderKey);
