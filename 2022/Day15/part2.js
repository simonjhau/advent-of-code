const text = await Deno.readTextFile("./input.txt");

const sensors = new Map();
const beacons = new Map();

const lines = text.split("\n");
lines.forEach((line) => {
  const [sx, sy, bx, by] = line.match(/-?\d+/g).map((val) => parseInt(val));

  const dist = Math.abs(sx - bx) + Math.abs(sy - by);

  const sensorKey = `${sy},${sx}`;
  sensors.set(sensorKey, { col: sx, row: sy, dist });

  const beaconKey = `${by},${bx}`;
  beacons.set(beaconKey, { row: by, col: bx });
});

const MAX_ROW_COL = 4000000;
const isPossibleLocation = (row, col) => {
  if (row < 0 || row > MAX_ROW_COL || col < 0 || col > MAX_ROW_COL) {
    return false;
  }

  for (const sensor of sensors.values()) {
    const key = `${row},${col}`;
    if (sensors.has(key) || beacons.has(key)) {
      return false;
    }

    const dist = Math.abs(sensor.row - row) + Math.abs(sensor.col - col);

    if (dist <= sensor.dist) {
      return false;
    }
  }
  return true;
};

// For each sensor, check just beyond the edge of it's "vision"
let x = -1;
let y = -1;
let found = false;
for (const sensor of sensors.values()) {
  if (found) {
    break;
  }

  const dist = sensor.dist + 1;
  for (let dr = -dist; dr < dist; dr++) {
    const dc = dist - Math.abs(dr);
    if (isPossibleLocation(sensor.row + dr, sensor.col + dc)) {
      y = sensor.row + dr;
      x = sensor.row + dc;
      found = true;
      break;
    }
    if (isPossibleLocation(sensor.row + dr, sensor.col - dc)) {
      y = sensor.row + dr;
      x = sensor.col - dc;
      found = true;
      break;
    }
  }
}

const tuningFrequency = x * 4000000 + y;
console.log({ tuningFrequency });
