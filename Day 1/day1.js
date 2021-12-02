const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let depths = data.split('\n').map((depth) => parseInt(depth));

  let numIncreases = 0;

  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      numIncreases++;
    }
  }

  console.log(numIncreases);
});
