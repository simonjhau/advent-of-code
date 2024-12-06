const lines = Deno.readTextFileSync('input.txt').split('\n');

const dir = (a: number, b: number) => {
	return (a - b) / Math.abs(a - b);
};

let numSafe = 0;
for (const line of lines) {
	const levels = line.split(' ').map((str) => parseInt(str, 10));

	const d0 = dir(levels[0], levels[1]);

	let safe = true;
	for (let i = 1; i < levels.length; i++) {
		const l = levels[i - 1];
		const r = levels[i];
		if (dir(l, r) !== d0 || l === r || Math.abs(l - r) > 3) {
			safe = false;
			break;
		}
	}

	if (safe) {
		numSafe++;
	}
}

console.log(numSafe);
