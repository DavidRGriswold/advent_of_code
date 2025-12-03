let startTime = Date.now();
var fname = "inputs/" + process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
const { receiveMessageOnPort } = require("worker_threads");
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

filePath = path.join(__dirname, fname);
let input = fs.readFileSync(filePath).toString();
let robots = parseInput(input);
let robots2 = parseInput(input);
runRobots(robots, 100, 101, 103);
let sf = getSafetyFactor(robots, 101, 103);
console.log(sf);
let treeRuns = runRobotsWithPicture(robots2, 101 * 103, 101, 103);
/**
 * Parse the input and return an array of robot objects
 * @param {String} input
 * @returns {{x:Number,y:Number,vx:Number,vy:Number}[]}
 */
function parseInput(input) {
  let lines = input.split("\n");
  let robots = [];
  for (let line of lines) {
    let r = /(-?\d+)/g;
    let m = [...line.matchAll(r)];
    let o = {
      x: Number(m[0][0]),
      y: Number(m[1][0]),
      vx: Number(m[2][0]),
      vy: Number(m[3][0]),
    };
    robots.push(o);
  }
  return robots;
}

/**
 * Run the robots to their new positions
 * @param {{x:Number,y:Number,vx:Number,vy:Number}[]} robots
 * @param {int} runs
 * @param {int} w width
 * @param {int} h height
 *
 */
function runRobots(robots, runs, w, h) {
  for (let robot of robots) {
    for (let i = 0; i < runs; i++) {
      robot.x = robot.x + robot.vx;
      robot.y = robot.y + robot.vy;
      if (robot.x < 0) robot.x = w + robot.x;
      if (robot.y < 0) robot.y = h + robot.y;
      if (robot.x >= w) robot.x = robot.x - w;
      if (robot.y >= h) robot.y = robot.y - h;
    }
  }
}

/**
 * Return the safety factor for the current setup
 * @param {{x:Number,y:Number,vx:Number,vy:Number}[]} robots
 */
function getSafetyFactor(robots, w, h) {
  let cx = (w - 1) / 2;
  let cy = (h - 1) / 2;
  let q1 = (q2 = q3 = q4 = 0);
  for (let r of robots) {
    if (r.x < cx && r.y < cy) q1++;
    if (r.x < cx && r.y > cy) q2++;
    if (r.x > cx && r.y < cy) q3++;
    if (r.x > cx && r.y > cy) q4++;
  }
  return q1 * q2 * q3 * q4;
}
/**
 * runs the robots printing the pictures. When it finds one with a long line
 * in one row and one column it pauses, lets it display for 10 seconds, the
 * console.logs the result. Run this in a LARGE terminal window for 103 rows!
 * @param {*} robots
 * @param {*} runs
 * @param {*} w
 * @param {*} h
 */
async function runRobotsWithPicture(robots, runs, w, h) {
  for (let i = 1; i <= runs; i++) {
    process.stdout.write("\x1b[2J"); // clear screen
    process.stdout.write("\x1b[" + (h + 1) + ";" + (w + 1) + "H" + i);
    let rowCounts = new Array(h).fill(0);
    let colCounts = new Array(w).fill(0);
    for (let robot of robots) {
      robot.x = robot.x + robot.vx;
      robot.y = robot.y + robot.vy;
      if (robot.x < 0) robot.x = w + robot.x;
      if (robot.y < 0) robot.y = h + robot.y;
      if (robot.x >= w) robot.x = robot.x - w;
      if (robot.y >= h) robot.y = robot.y - h;
      rowCounts[robot.y]++;
      colCounts[robot.x]++;
      process.stdout.write("\x1b[" + robot.y + ";" + robot.x + "H#");
    }
    if (
      rowCounts.filter((e) => e > 15).length > 1 &&
      colCounts.filter((e) => e > 15).length > 1
    ) {
      await sleep(10000);
      process.stdout.write("\x1b[2J"); // clear screen
      console.log(i);
      break;
    }
  }
}
