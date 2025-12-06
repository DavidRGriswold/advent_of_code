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
let lines = input.split("\n");
// pad with dots all around to avoid havig to treat corners and edges different
lines = lines.map((i) => "." + i + ".");
lines.push(".".repeat(lines[0].length));
lines.splice(0, 0, ".".repeat(lines[1].length));

let chars = lines.map((i) => i.split(""));

let count = 0;
let removers = [];
for (let i = 1; i < chars.length - 1; i++) {
  for (let j = 1; j < chars[0].length - 1; j++) {
    let countRolls = 0;
    if (chars[i][j] != "@") continue;
    countRolls += chars[i - 1][j - 1] == "@" ? 1 : 0;
    countRolls += chars[i - 1][j] == "@" ? 1 : 0;
    countRolls += chars[i - 1][j + 1] == "@" ? 1 : 0;
    countRolls += chars[i][j - 1] == "@" ? 1 : 0;
    countRolls += chars[i][j + 1] == "@" ? 1 : 0;
    countRolls += chars[i + 1][j - 1] == "@" ? 1 : 0;
    countRolls += chars[i + 1][j] == "@" ? 1 : 0;
    countRolls += chars[i + 1][j + 1] == "@" ? 1 : 0;
    if (countRolls < 4) {
      removers.push([i, j]);
      count++;
    }
  }
}
console.log("Part 1: " + count);

removers.map((el) => {
  chars[el[0]][el[1]] = ".";
});
removers = [];
// keep going
let newCount = 0;
do {
  newCount = 0;
  for (let i = 1; i < chars.length - 1; i++) {
    for (let j = 1; j < chars[0].length - 1; j++) {
      let countRolls = 0;
      if (chars[i][j] != "@") continue;
      countRolls += chars[i - 1][j - 1] == "@" ? 1 : 0;
      countRolls += chars[i - 1][j] == "@" ? 1 : 0;
      countRolls += chars[i - 1][j + 1] == "@" ? 1 : 0;
      countRolls += chars[i][j - 1] == "@" ? 1 : 0;
      countRolls += chars[i][j + 1] == "@" ? 1 : 0;
      countRolls += chars[i + 1][j - 1] == "@" ? 1 : 0;
      countRolls += chars[i + 1][j] == "@" ? 1 : 0;
      countRolls += chars[i + 1][j + 1] == "@" ? 1 : 0;
      if (countRolls < 4) {
        removers.push([i, j]);
        newCount++;
      }
    }
  }
  count += newCount;
  removers.map((el) => (chars[el[0]][el[1]] = "."));
  removers = [];
} while (newCount > 0);

console.log("part 2: " + count);
