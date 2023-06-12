const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");

const originalValues = {};
const equations = {};

for (const line of lines) {
  const [name, job] = line.split(":");
  const number = parseInt(job);
  if (isNaN(number)) {
    // Equation
    equations[name] = job.trim().split(" ");
  } else {
    originalValues[name] = number;
  }
}

const getValue = (name, values) => {
  if (values[name] !== undefined) {
    return values[name];
  }

  const [left, operator, right] = equations[name];
  const leftVal = values[left] ? values[left] : getValue(left, values);
  const rightVal = values[right] ? values[right] : getValue(right, values);
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
      res = Math.floor(leftVal / rightVal);
      break;
    }
  }
  values[name] = res;
  return res;
};

const rightValue = getValue(equations["root"][2], originalValues);

// binary search
let left = 0;
let right = 8000000000000;

while (left < right) {
  const mid = Math.floor(left + (right - left) / 2);
  const values = { ...originalValues };
  values["humn"] = mid;
  const leftValue = getValue(equations["root"][0], values);
  if (leftValue === rightValue) {
    console.log(mid);
    break;
  } else if (leftValue < rightValue) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}
