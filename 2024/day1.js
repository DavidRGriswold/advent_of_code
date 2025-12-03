/* To run this code, you need to have node.js installed on your computer.
 * You can then run the command `node day1.js data1.txt` to run your code on
 * input stored inside a file called data1.txt
 */

/* These first 7 lines simply read the input into a single string called input */
var fname = process.argv[2];
console.log(fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();

// split input into an array of strings, on per line
let lines = input.split("\n");
let l1 = [], l2 = [];

// iterate through each line
for (let line of lines) {
    // split the line by spaces, so t is an array of strings that
    // hold numeric values
    let t = line.split(/\W+/);
    // create the two lists, l1 is column 1, l2 is column 2
    // convert them into numeric values as we go
    l1.push(Number(t[0]));
    l2.push(Number(t[1]));
}
// yay sort
l1.sort();
l2.sort();

let diffs = [];
let sum = 0;
for (let i  = 0 ; i < l1.length; i++) {
    // push the difference into an array called diffs
    diffs.push(Math.abs(l1[i]-l2[i]));
    sum+= diffs[i];
}
// answer to part 1
console.log(sum);

let sim = 0;
for (let num of l1) {
    // this filter method creates an array of all
    // of the elements of list that equal num
    // so the length returns how many l2s match each value from l1
    sim += num * l2.filter((val)=>(val===num)).length;
}
// answer to part 2
console.log(sim);

