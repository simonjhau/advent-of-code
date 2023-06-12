const text = await Deno.readTextFile("./input.txt");

let numFullyContainOther = 0;

const lines = text.split("\n");
for (const line of lines) {
  const assignments = line.split(",");
  const ranges = assignments.map((assignment) =>
    assignment.split("-").map((num) => parseInt(num))
  );

  if (
    (ranges[0][1] >= ranges[1][0] && ranges[0][1] >= ranges[1][1]) ||
    (ranges[0][0] >= ranges[1][0] && ranges[0][1] <= ranges[1][1])
  ) {
    numFullyContainOther++;
  }
}

console.log(numFullyContainOther);
