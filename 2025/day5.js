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

let [part1, part2] = input.split("\n\n");
let rangeStrings = part1.split("\n");
let availableIngredients = part2.split("\n").map(Number);

let ranges = rangeStrings.map((s) => s.split("-").map(Number));

let isInRange = function (x) {
  for (range of ranges) {
    if (x >= range[0] && x <= range[1]) return true;
  }
  return false;
};

let count = 0;
for (let i of availableIngredients) {
  if (isInRange(i)) count++;
}
console.log("part 1: " + count);

// sort ranges by start
ranges.sort((a, b) => a[0] - b[0]);

count = 0;

let uniqueRanges = [];

let i = 0;
while (i < ranges.length) {
  //merge ranges starting here
  let j = i + 1;
  while (j < ranges.length && ranges[j][0] <= ranges[i][1]) {
    if (ranges[j][1] > ranges[i][1]) ranges[i][1] = ranges[j][1];
    j++;
  }
  uniqueRanges.push(ranges[i]);
  i = j;
}

for (let r of uniqueRanges) {
  count += r[1] - r[0] + 1;
}
console.log("Part 2: " + count);
