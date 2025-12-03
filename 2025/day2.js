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

let lines = input.split(",");
let ranges = lines.map((l) => l.split("-").map(Number));
let count = 0;

for (let r of ranges) {
  for (let i = r[0]; i <= r[1]; i++) {
    let s = i + "";
    let vals = {};
    l = s.length / 2;
    if (Math.round(l) === l && s.length % l == 0) {
      var b = [];
      //split by this amount
      for (var j = l; j <= s.length; j += l) {
        b.push(s.substring(j - l, j));
      }
      if (b.every((v) => v == b[0])) {
        if (!vals[s]) {
          vals[s] = true;
          console.log(i);
          count += i;
        }
      }
    }
  }
}
console.log("Part 1: " + count);

count = 0;
for (let r of ranges) {
  for (let i = r[0]; i <= r[1]; i++) {
    let s = i + "";
    let vals = {};
    // l is possible lengths to split into
    for (let l = 1; l <= s.length / 2; l++) {
      if (Math.round(l) == l && s.length % l == 0) {
        var b = [];
        //split by this amount
        for (var j = l; j <= s.length; j += l) {
          b.push(s.substring(j - l, j));
        }
        if (b.every((v) => v == b[0])) {
          if (!vals[s]) {
            vals[s] = true;
            console.log(i);
            count += i;
          }
        }
      }
    }
  }
}
console.log("Part 2: " + count);
