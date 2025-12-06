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

let lines = input.trim().split("\n");
let ops = lines.pop().trim().split(/ +/);
let nums = lines.map((e) => e.trim().split(/ +/).map(Number));
let total = 0;
for (let i = 0; i < ops.length; i++) {
  let t = ops[i] == "+" ? 0 : 1;
  for (let j = 0; j < nums.length; j++) {
    t = ops[i] == "+" ? t + nums[j][i] : t * nums[j][i];
  }
  total += t;
}

console.log("Part 1: " + total);

// build a character grid
let chars = lines.map((e) => e.split(""));
//rotate it
let rotatedChars = new Array(chars[0].length).fill(new Array(chars.length));
rotatedChars = rotatedChars.map((e) => new Array(chars.length));
for (let i = 0; i < chars.length; i++) {
  for (let j = 0; j < chars[0].length; j++) {
    rotatedChars[j][i] = chars[i][j];
  }
}
let strings = rotatedChars.map((e) => e.join("").trim());
let curStringIndex = 0;
total = 0;
for (let i = 0; i < ops.length; i++) {
  let t = ops[i] == "+" ? 0 : 1;
  while (curStringIndex < strings.length && strings[curStringIndex] != "") {
    t =
      ops[i] == "+"
        ? t + Number(strings[curStringIndex])
        : t * Number(strings[curStringIndex]);
    curStringIndex++;
  }
  total += t;
  curStringIndex++;
}
console.log("Part 2: " + total);
