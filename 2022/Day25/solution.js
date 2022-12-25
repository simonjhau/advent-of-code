const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");
let sum = 0;
for (const line of lines) {
  const digits = line.split("");
  digits.reverse();
  digits.forEach((d, i) => {
    let digit = 0;
    if (d === "=") {
      digit = -2;
    } else if (d === "-") {
      digit = -1;
    } else {
      digit = parseInt(d);
    }
    sum += digit * Math.pow(5, i);
  });
}

console.log(sum);

const digits = [];
while (sum > 0) {
  let digit = sum % 5;
  if (digit === 4) {
    digit = -1;
  } else if (digit === 3) {
    digit = -2;
  }
  digits.push(digit);

  sum -= digit;
  sum /= 5;
}

const snafuDigits = digits.reverse().map((d) => {
  if (d === -2) {
    return "=";
  }
  if (d === -1) {
    return "-";
  }
  return d;
});

const snafu = snafuDigits.join("");
console.log(snafu);
