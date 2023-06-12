const text = await Deno.readTextFile("./input.txt");

const allValves = {};
const lines = text.split("\n");
const startValve = "AA";
lines.forEach((line) => {
  const valve = line.match(/[A-Z]{2}|\d+/g);
  allValves[valve[0]] = {
    flowRate: parseInt(valve[1]),
    tunnels: valve.slice(2),
  };
});

const bfs = (startValve) => {
  const connected = {};
  const visited = new Set();
  const queue = [{ valve: startValve, dist: 0 }];
  while (queue.length > 0) {
    const { valve, dist } = queue.shift();
    if (visited.has(valve)) {
      continue;
    }
    visited.add(valve);
    if (valve !== startValve && allValves[valve].flowRate > 0) {
      connected[valve] = dist;
    }
    for (const nextValve of allValves[valve].tunnels) {
      queue.push({ valve: nextValve, dist: dist + 1 });
    }
  }

  return connected;
};

// Minimise graph to remove 0 flowrate nodes
const valves = {};
for (const valve in allValves) {
  if (allValves[valve].flowRate > 0) {
    valves[valve] = {};
    valves[valve].flowRate = allValves[valve].flowRate;
    valves[valve].nextValves = bfs(valve);
  }
}

valves[startValve] = {};
valves[startValve].flowRate = allValves[startValve].flowRate;
valves[startValve].nextValves = bfs(startValve);

// DFS to go through all combinations
const TOTAL_MINUTES = 30;
let maxPressureReleased = 0;
const dfs = (
  curValve,
  time = 0,
  pressureReleased = 0,
  openValves = new Set()
) => {
  if (time >= TOTAL_MINUTES) {
    return;
  }

  const newOpenValves = new Set(openValves);
  newOpenValves.add(curValve);

  const newPressureReleased =
    pressureReleased + (TOTAL_MINUTES - time) * valves[curValve].flowRate;

  for (const nextValve in valves[curValve].nextValves) {
    if (!newOpenValves.has(nextValve)) {
      const distance = valves[curValve].nextValves[nextValve];
      const nextTime = time + distance + 1;
      dfs(nextValve, nextTime, newPressureReleased, newOpenValves);
    }
  }

  maxPressureReleased = Math.max(newPressureReleased, maxPressureReleased);
};

dfs(startValve);
console.log(maxPressureReleased);
