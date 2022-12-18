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
const TOTAL_MINUTES = 26;
const allPaths = [];
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

  allPaths.push({
    pressureReleased: newPressureReleased,
    path: new Set([...newOpenValves].slice(1)),
  });
};

dfs(startValve);
allPaths.sort((a, b) => b.pressureReleased - a.pressureReleased);

const getIntersection = (setA, setB) => {
  const intersection = new Set(
    [...setA].filter((element) => setB.has(element))
  );
  return intersection;
};

// Find highest two paths with non-overlapping elements
let found = false;
for (let i = 0; i < allPaths.length && found === false; i++) {
  for (let j = i + 1; j < allPaths.length && found === false; j++) {
    if (getIntersection(allPaths[i].path, allPaths[j].path).size === 0) {
      const pressureReleased =
        allPaths[i].pressureReleased + allPaths[j].pressureReleased;
      console.log(pressureReleased);
      found = true;
    }
  }
}
