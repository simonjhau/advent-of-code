const text = await Deno.readTextFile("./input.txt");

const maxCoords = { x: 0, y: 0, z: 0 };
const lines = text.split("\n");
const cubes = [];
for (const line of lines) {
  const coords = line.split(",").map((coord) => parseInt(coord));
  maxCoords.x = Math.max(coords[0], maxCoords.x);
  maxCoords.y = Math.max(coords[1], maxCoords.y);
  maxCoords.z = Math.max(coords[2], maxCoords.z);
  cubes.push({ x: coords[0], y: coords[1], z: coords[2] });
}

const axes = new Array(maxCoords.x + 1)
  .fill()
  .map(() =>
    new Array(maxCoords.y + 1)
      .fill()
      .map(() => new Array(maxCoords.z + 1).fill(0))
  );

for (const cube of cubes) {
  axes[cube.x][cube.y][cube.z] = 1;
}

const dfs = (x, y, z) => {
  if (
    x < 0 ||
    x > maxCoords.x ||
    y < 0 ||
    y > maxCoords.y ||
    z < 0 ||
    z > maxCoords.z
  ) {
    return;
  }

  if (axes[x][y][z] === 0) {
    axes[x][y][z] = 2;
    dfs(x + 1, y, z);
    dfs(x - 1, y, z);
    dfs(x, y + 1, z);
    dfs(x, y - 1, z);
    dfs(x, y, z + 1);
    dfs(x, y, z - 1);
  }
};

// flood fill the outside
for (let x = 0; x <= maxCoords.x; x++) {
  for (let y = 0; y <= maxCoords.y; y++) {
    for (let z = 0; z <= maxCoords.z; z++) {
      if (
        x === 0 ||
        x === maxCoords.x ||
        y === 0 ||
        y === maxCoords.y ||
        z === 0 ||
        z === maxCoords.z
      ) {
        dfs(x, y, z);
      }
    }
  }
}

let surfaceArea = 0;
for (const cube of cubes) {
  const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  for (const direction of directions) {
    const adjacentCube = { ...cube };
    adjacentCube.x += direction[0];
    adjacentCube.y += direction[1];
    adjacentCube.z += direction[2];

    if (
      adjacentCube.x < 0 ||
      adjacentCube.x > maxCoords.x ||
      adjacentCube.y < 0 ||
      adjacentCube.y > maxCoords.y ||
      adjacentCube.z < 0 ||
      adjacentCube.z > maxCoords.z ||
      axes[adjacentCube.x][adjacentCube.y][adjacentCube.z] === 2
    ) {
      surfaceArea++;
    }
  }
}
console.log(surfaceArea);
