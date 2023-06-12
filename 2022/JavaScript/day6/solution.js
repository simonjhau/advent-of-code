const text = await Deno.readTextFile("./input.txt");

const letterCounts = new Array(26).fill(0);
const WINDOW_SIZE = 14;
let numUnique = 0;

for (let i = 0; i < text.length; i++) {
  const letterIdx = text[i].charCodeAt() - "a".charCodeAt();
  letterCounts[letterIdx]++;
  if (letterCounts[letterIdx] === 1) {
    numUnique++;
  }

  if (i >= WINDOW_SIZE) {
    const letterToRemoveIdx =
      text[i - WINDOW_SIZE].charCodeAt() - "a".charCodeAt();
    letterCounts[letterToRemoveIdx]--;
    if (letterCounts[letterToRemoveIdx] === 0) {
      numUnique--;
    }
  }

  if (numUnique === WINDOW_SIZE) {
    console.log(i + 1);
    break;
  }
}
