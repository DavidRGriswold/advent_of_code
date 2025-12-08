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

let nodes = input.split("\n").map((e) => e.split(",").map(Number));

let distances = [];
let circuits = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    distances.push({ n1: i, n2: j, d: dist(nodes[i], nodes[j]) });
  }
  circuits.push(new Set([i]));
}
distances.sort((a, b) => a.d - b.d);

// 10 for sample, 1000 for puzzle input
let repeats = 1000;
for (let i = 0; i < repeats; i++) {
  let c1 = circuits[distances[i].n1];
  let c2 = circuits[distances[i].n2];
  //make c2 contain everything in c1
  c1.forEach((e) => c2.add(e));
  // replace everything in c2 with the c2 set
  c2.forEach((e) => {
    circuits[e] = c2;
  });
}
// silly but neat way to get only unique elements
let u = [...new Set(circuits)];

// sort descending by size of set
u.sort((a, b) => b.size - a.size);

console.log("Part 1: " + u[0].size * u[1].size * u[2].size);

// keep going!
for (let i = repeats; i < distances.length; i++) {
  let c1 = circuits[distances[i].n1];
  let c2 = circuits[distances[i].n2];
  //make c2 contain everything in c1
  c1.forEach((e) => c2.add(e));
  c2.forEach((e) => {
    circuits[e] = c2;
  });
  if (c2.size == nodes.length) {
    //one circuit!
    console.log(
      "Part 2: " + nodes[distances[i].n1][0] * nodes[distances[i].n2][0]
    );
    break;
  }
}

function dist(n1, n2) {
  let dx = n1[0] - n2[0];
  let dy = n1[1] - n2[1];
  let dz = n1[2] - n2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
