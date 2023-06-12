const text = await Deno.readTextFile("./input.txt");

const curPath = ["/"];
const directorySizes = {};

const lines = text.split("\n");
for (const line of lines) {
  const commands = line.split(" ");

  if (commands[0] === "$") {
    if (commands[1] === "cd") {
      if (commands[2] === "/") {
        curPath.length = 1;
      } else if (commands[2] === "..") {
        curPath.pop();
      } else {
        curPath.push(commands[2]);
      }
    }
  } else if (commands[0] !== "dir") {
    const fileSize = parseInt(commands[0]);
    for (let i = 1; i <= curPath.length; i++) {
      const path = `${curPath.slice(0, i).join("/")}`;
      directorySizes[path] = directorySizes[path]
        ? directorySizes[path] + fileSize
        : fileSize;
    }
  }
}

const FILESYSTEM_SIZE = 70000000;
const UNUSED_SPACE_REQUIRED = 30000000;
const spaceToFree =
  UNUSED_SPACE_REQUIRED - (FILESYSTEM_SIZE - directorySizes["/"]);

let dirsLargerThan100000 = 0;
let sizeOfDirToDelete = Infinity;

for (const dirSize of Object.values(directorySizes)) {
  if (dirSize <= 100000) {
    dirsLargerThan100000 += dirSize;
  }
  if (dirSize > spaceToFree) {
    sizeOfDirToDelete = Math.min(sizeOfDirToDelete, dirSize);
  }
}

console.log({ dirsLargerThan100000 });
console.log({ sizeOfDirToDelete });

const arr = []
arr.push(1);
