/* To run this code, you need to have node.js installed on your computer.
 * You can then run the command `node day1.js data1.txt` to run your code on
 * input stored inside a file called data1.txt
 */

/* These first 7 lines simply read the input into a single string called input */
var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();

let sum = 0;
for (let line of input.split("\n")) {
  sum += maxJoltage(line);
}
console.log("Part 1: " + sum);

sum = 0;
for (let line of input.split("\n")) {
  sum += max12Joltage(line);
}

console.log("Part 2:" + sum);

function maxJoltage(bank) {
  let [pos, first] = maxValue(bank.substring(0, bank.length - 1));
  let [pos2, second] = maxValue(bank.substring(pos + 1));
  return 10 * first + second;
}

function max12Joltage(bank) {
  let joltage = 0;
  let pos = -1;
  let val;
  for (let i = 11; i >= 0; i--) {
    [newpos, val] = maxValue(bank.substring(pos + 1, bank.length - i));
    pos = pos + newpos + 1;
    console.log(val, pos);
    joltage += val * Math.pow(10, i);
  }
  return joltage;
}

function maxValue(bank) {
  let chars = bank.split("");
  let digits = chars.map(Number);
  let maxPos = 0;
  for (let i = 1; i < digits.length; i++) {
    if (digits[i] > digits[maxPos]) {
      maxPos = i;
    }
  }
  return [maxPos, digits[maxPos]];
}
