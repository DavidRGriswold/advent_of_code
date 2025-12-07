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
let start = lines[0].indexOf("S");
let beams = [new Set(), new Set([start])];
let splitCount = 0;
for (let i = 2; i < lines.length; i++) {
  beams[i] = new Set();
  for (let beam of beams[i - 1]) {
    if (lines[i][beam] == "^") {
      if (beam >= 1) beams[i].add(beam - 1);
      if (beam < lines[i].length) beams[i].add(beam + 1);
      splitCount++;
    } else {
      beams[i].add(beam);
    }
  }
}
console.log("Part 1: " + splitCount);

// wow, it's a version of pascal's triangle. Awesome.
// let's actually build the triangle.
// first, char arrays
let chars = lines.map((e) => e.split(""));

//put in starter element
chars[0][chars[0].indexOf("S")] = 1;

// lets just delete every other row, we don't need them
chars = chars.filter((e, i) => i % 2 == 0);
for (let i = 1; i < chars.length; i++) {
  for (let j = 0; j < chars[i].length; j++) {
    let val = 0;
    if (chars[i][j] == "^") continue;
    // check if there is a number directly above this
    if (chars[i - 1][j] != "." && !isNaN(chars[i - 1][j])) {
      val += Number(chars[i - 1][j]);
    }
    // check if there is a splitter to my left and a number
    // above it
    if (j > 0 && chars[i][j - 1] == "^" && !isNaN(chars[i - 1][j - 1])) {
      val += Number(chars[i - 1][j - 1]);
    }
    // now check for a splitter to the right
    if (
      j < chars[i].length - 1 &&
      chars[i][j + 1] == "^" &&
      !isNaN(chars[i - 1][j + 1])
    ) {
      val += Number(chars[i - 1][j + 1]);
    }
    if (val != 0) chars[i][j] = val;
  }
}

let finalRow = chars[chars.length - 1];
let paths = 0;
for (let i = 0; i < finalRow.length; i++) {
  if (!isNaN(finalRow[i])) {
    paths += Number(finalRow[i]);
  }
}
console.log("Part 2: " + paths);
