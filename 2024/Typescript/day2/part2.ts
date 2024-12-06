const lines = Deno.readTextFileSync('test.txt').split('\n');

const dir = (a: number, b: number) => {
	return (a - b) / Math.abs(a - b);
};

const indexAfterIgnore = (l: number, r: number, ignore: number) => {
	if (l === ignore) {
		return [l + 1, r + 1];
	} else if (r === ignore) {
		return [l, r + 1];
	}
	return [l, r];
};

let numSafe = 0;
for (const line of lines) {
	const levels = line.split(' ').map((str) => parseInt(str, 10));
	console.log('########################################');
	console.log(levels);
	for (let ignore = -1; ignore < levels.length - 1; ignore++) {
		let safe = true;
		const start = indexAfterIgnore(0, 1, ignore);
		console.log({ start });
		const d0 = dir(levels[start[0]], levels[start[1]]);
		console.log({ ignore, d0 });
		for (let i = 1; i < levels.length; i++) {
			const [l1, r1] = indexAfterIgnore(i - 1, i, ignore);
			if (r1 === levels.length - 1) {
				break;
			}
			const l = levels[l1];
			const r = levels[r1];
			console.log({ l1, r1, l, r, dir: dir(l, r) });
			if (dir(l, r) !== d0 || l === r || Math.abs(l - r) > 3) {
				safe = false;
				console.log('unsafe');
				break;
			}
		}

		if (safe) {
			numSafe++;
			console.log('safe');
			break;
		}
	}
}

console.log(numSafe);
