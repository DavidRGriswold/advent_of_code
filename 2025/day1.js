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

// split input into an array of strings, on per line
let lines = input.split("\n");

let pos = 50;
let count = 0;
// iterate through each line
for (let line of lines) {
  let dir = line[0];
  let num = Number(line.substring(1));
  if (dir == "L") pos -= num;
  else pos += num;
  if (pos < 0) pos = 100 + (pos % 100);
  if (pos >= 100) pos %= 100;
  if (pos == 0) count++;
}

console.log(count);

pos = 50;
count = 0;
// iterate through each line
for (let line of lines) {
  let dir = line[0];
  let num = Number(line.substring(1));
  count += Math.floor(num / 100);
  if (dir == "L") num = -num;
  if (pos == 0 && num < 0) pos = 100;
  pos += num % 100;

  if (pos > 99) {
    count++;
    pos -= 100;
  } else if (pos < 0) {
    count++;
    pos += 100;
  } else if (pos == 0) {
    count++;
  }
  //console.log(line + " - " + pos + " - " + count);
}

console.log(count);
