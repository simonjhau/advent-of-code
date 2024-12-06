const input = Deno.readTextFileSync('input.txt');

const re = /mul\([0-9]+,[[0-9]+\)|do\(\)|don't\(\)/g;
const instructions = input.match(re);

if (!instructions) {
	throw new Error('Invalid input');
}

let sum = 0;
let doMultiply = true;
for (const instruction of instructions) {
	if (instruction == 'do()') {
		doMultiply = true;
	} else if (instruction == "don't()") doMultiply = false;
	else if (doMultiply) {
		console.log(instruction);
		const numbers = instruction.slice(4, instruction.length - 1).split(
			',',
		).map(Number);
		sum += numbers[0] * numbers[1];
	}
}
console.log({ sum });
