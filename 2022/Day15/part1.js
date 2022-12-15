const text = await Deno.readTextFile("./input.txt");

const sensors = new Map();
const beacons = new Map();
let xMin = Infinity;
let xMax = 0;
const lines = text.split("\n");
lines.forEach((line) => {
  const [sx, sy, bx, by] = line.match(/-?\d+/g).map((val) => parseInt(val));

  const dist = Math.abs(sx - bx) + Math.abs(sy - by);
  xMin = Math.min(sx - dist, xMin);
  xMax = Math.max(sx + dist, xMax);

  const sensorKey = `${sy},${sx}`;
  sensors.set(sensorKey, { col: sx, row: sy, dist });

  const beaconKey = `${by},${bx}`;
  beacons.set(beaconKey, { row: by, col: bx });
});

const ROW_TO_CHECK = 2000000;
let count = 0;
for (let col = xMin; col < xMax; col++) {
  for (const sensor of sensors.values()) {
    const dist =
      Math.abs(sensor.row - ROW_TO_CHECK) + Math.abs(sensor.col - col);
    const key = `${ROW_TO_CHECK},${col}`;
    if (dist <= sensor.dist && !sensors.has(key) && !beacons.has(key)) {
      count++;
      break;
    }
  }
}
console.log(count);
