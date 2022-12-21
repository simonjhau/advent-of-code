const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");

const values = {};
const equations = {};

for (const line of lines) {
  const [name, job] = line.split(":");
  const number = parseInt(job);
  if (isNaN(number)) {
    // Equation
    equations[name] = job.trim().split(" ");
  } else {
    values[name] = number;
  }
}

const getValue = (name) => {
  if (values[name] !== undefined) {
    return values[name];
  }

  const [left, operator, right] = equations[name];
  const leftVal = values[left] ? values[left] : getValue(left);
  const rightVal = values[right] ? values[right] : getValue(right);
  let res = 0;
  switch (operator) {
    case "+": {
      res = leftVal + rightVal;
      break;
    }
    case "-": {
      res = leftVal - rightVal;
      break;
    }
    case "*": {
      res = leftVal * rightVal;
      break;
    }
    case "/": {
      res = leftVal / rightVal;
      break;
    }
  }
  values[name] = res;
  return res;
};

console.log(getValue("root"));
