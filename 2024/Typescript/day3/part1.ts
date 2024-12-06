const input = Deno.readTextFileSync('input.txt');

const re = /mul\([0-9]+,[[0-9]+\)/g;
const multiplications = input.match(re);

if (!multiplications) {
	throw new Error('Invalid input');
}

let sum = 0;
for (const multiplication of multiplications) {
	const numbers = multiplication.slice(4, multiplication.length - 1).split(
		',',
	).map(Number);
	sum += numbers[0] * numbers[1];
}
console.log({ sum });
