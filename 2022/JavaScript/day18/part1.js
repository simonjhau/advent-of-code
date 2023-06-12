const text = await Deno.readTextFile("./input.txt");

const maxCoords = { x: 0, y: 0, z: 0 };
const lines = text.split("\n");
const cubes = new Map();
for (const line of lines) {
  const coords = line.split(",").map((coord) => parseInt(coord));
  maxCoords.x = Math.max(coords[0], maxCoords.x);
  maxCoords.y = Math.max(coords[1], maxCoords.y);
  maxCoords.z = Math.max(coords[2], maxCoords.z);
  const key = coords.join(",");
  cubes.set(key, { x: coords[0], y: coords[1], z: coords[2] });
}

let surfaceArea = cubes.size * 6;
cubes.forEach((cube) => {
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

    const key = Object.values(adjacentCube).join(",");
    if (cubes.has(key)) {
      surfaceArea--;
    }
  }
});
console.log(surfaceArea);
