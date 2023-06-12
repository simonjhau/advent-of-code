const text = await Deno.readTextFile("./input.txt");
const DECRYPTION_KEY = 811589153;
const originalList = text.split("\n").map((val) => val * DECRYPTION_KEY);
const mixedList = originalList.map((value, originalIdx) => {
  return { value: parseInt(value), originalIdx };
});

const NUM_MIX = 10;
for (let mix = 0; mix < NUM_MIX; mix++) {
  for (let i = 0; i < originalList.length; i++) {
    const index = mixedList.findIndex((elem) => elem.originalIdx === i);
    const elem = mixedList.splice(index, 1)[0];
    const newIndex = (index + elem.value) % mixedList.length;
    mixedList.splice(newIndex, 0, elem);
  }
}

const zeroIndex = mixedList.findIndex((elem) => elem.value === 0);
const sumOfGrove =
  mixedList[(zeroIndex + 1000) % mixedList.length].value +
  mixedList[(zeroIndex + 2000) % mixedList.length].value +
  mixedList[(zeroIndex + 3000) % mixedList.length].value;

console.log(sumOfGrove);
