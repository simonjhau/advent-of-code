const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");
const blueprints = [];
for (const line of lines) {
  const costs = line.match(/\d+/g).map((cost) => parseInt(cost));
  const robotCosts = {
    ore: { ore: costs[1] },
    clay: { ore: costs[2] },
    obsidian: { ore: costs[3], clay: costs[4] },
    geode: { ore: costs[5], obsidian: costs[6] },
  };
  const maxCosts = {
    ore: Math.max(costs[1], costs[2], costs[3], costs[5]),
    clay: costs[4],
    obsidian: costs[6],
    geode: Infinity,
  };
  blueprints.push({ robotCosts, maxCosts });
}

const canAfford = (robotType, blueprint, resources, robots) => {
  if (robots[robotType] >= blueprint.maxCosts[robotType]) {
    return false;
  }

  for (const mineral in blueprint.robotCosts[robotType]) {
    if (resources[mineral] < blueprint.robotCosts[robotType][mineral]) {
      return false;
    }
  }

  return true;
};

const getRobotsToBuild = (blueprint, resources, robots, skipped) => {
  if (canAfford("geode", blueprint, resources, robots)) {
    return ["geode"];
  }

  // if (canAfford("obsidian", blueprint, resources, robots)) {
  //   return ["obsidian"];
  // }

  const robotsToBuild = [];
  const robotTypes = ["obsidian", "clay", "ore"];
  for (const robotType of robotTypes) {
    if (skipped.includes(robotType)) {
    } else {
      if (canAfford(robotType, blueprint, resources, robots)) {
        robotsToBuild.push(robotType);
      }
    }
  }
  robotsToBuild.push("none");
  return robotsToBuild;
};

const TOTAL_MINUTES = 24;
const bfs = (blueprint) => {
  const resources = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  };
  const robots = {
    geode: 0,
    obsidian: 0,
    clay: 0,
    ore: 1,
  };
  const bestAtTime = new Array(TOTAL_MINUTES + 1).fill(0);
  const queue = [{ time: 1, resources, robots, skipped: [] }];
  let maxGeodes = 0;
  let curTime = 0;
  const seen = new Set();

  while (queue.length > 0) {
    const state = queue.shift();
    const { time, resources, robots, skipped } = state;

    // if (time > curTime) {
    //   console.log({ time });
    //   console.log(bestAtTime.join(","));
    //   curTime = time;
    // }

    if (time > TOTAL_MINUTES) {
      return maxGeodes;
    }

    if (seen.has(JSON.stringify({ time, resources, robots }))) {
      continue;
    }

    if (resources.geode < bestAtTime[time] - 2) {
      continue;
    }

    // Collect minerals
    const newResources = { ...resources };
    for (const robotType in robots) {
      newResources[robotType] += robots[robotType];
    }

    maxGeodes = Math.max(newResources.geode, maxGeodes);
    bestAtTime[time] = maxGeodes;

    const robotsToBuild = getRobotsToBuild(
      blueprint,
      resources,
      robots,
      skipped
    );

    const numRoundsRemaining = TOTAL_MINUTES - time;

    for (const robotType of robotsToBuild) {
      if (robotType === "none") {
        const newNewResources = { ...newResources };
        for (const resource in resources) {
          newNewResources[resource] %=
            blueprint.maxCosts[resource] * numRoundsRemaining;
        }
        queue.push({
          time: time + 1,
          resources: newNewResources,
          robots,
          skipped: robotsToBuild,
        });
      } else {
        const newNewResources = { ...newResources };

        for (const item in blueprint.robotCosts[robotType]) {
          newNewResources[item] -= blueprint.robotCosts[robotType][item];
          newNewResources[item] %=
            blueprint.maxCosts[item] * numRoundsRemaining;
        }
        const newRobots = { ...robots };
        newRobots[robotType]++;

        queue.push({
          time: time + 1,
          resources: newNewResources,
          robots: newRobots,
          skipped: [],
        });
      }
    }
    seen.add(JSON.stringify({ time, resources, robots }));
  }
};

let qualityLevelSum = 0;
blueprints.forEach((blueprint, blueprintIdx) => {
  const numGeodes = bfs(blueprint);
  const qualityLevel = numGeodes * (blueprintIdx + 1);
  console.log({ blueprintIdx: blueprintIdx + 1, numGeodes, qualityLevel });
  qualityLevelSum += qualityLevel;
});
console.log(qualityLevelSum);
