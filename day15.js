let startTime = Date.now();
var fname = "inputs/" + process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
const { receiveMessageOnPort } = require("worker_threads");
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

filePath = path.join(__dirname, fname);
let input = fs.readFileSync(filePath).toString().trim();
let [mapString, moveString] = input.split("\n\n");
let map = mapString.split("\n").map((e) => e.split(""));
moveString = moveString.replaceAll("\n","");
let moves = moveString.split("");
let pos = findFish(map);

for (let i = 0; i < moves.length; i++) {
  let move = moves[i];
  pos = doMove(map, move, pos[0], pos[1]);
  //    printMap(map,pos);
}

console.log(boxGPS(map));
let map2 = mapString.split("\n").map((e) => {
  e = e.replaceAll("O", "[]");
  e = e.replaceAll(".", "..");
  e = e.replaceAll("@", "@.");
  e = e.replaceAll("#", "##");
  return e.split("");
});

pos = findFish(map2);
console.log("start");
printMap(map2,pos);
for (let i = 0; i < 350; i++) {
     let move = moves[i];
      if (i>308) {
        console.log("")}
     console.log("move " + (i+1) + ": " + move)
     pos = doMove2(map2, move, pos[0], pos[1]);
     printMap(map2,pos);
   }
  printMap(map2,pos);
  console.log(boxGPS2(map2));

function findFish(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === "@") {
        map[i][j] = ".";
        return [i, j];
      }
    }
  }
  return [0, 0];
}
function doMove(map, move, i, j) {
  let ni, nj;
  switch (move) {
    case "<":
      [ni, nj] = [i, j - 1];
      break;
    case ">":
      [ni, nj] = [i, j + 1];
      break;
    case "^":
      [ni, nj] = [i - 1, j];
      break;
    case "v":
      [ni, nj] = [i + 1, j];
      break;
    default:
      return [i, j];
  }
  if (map[ni][nj] == "O") {
    doMove(map, move, ni, nj);
  }
  if (map[ni][nj] == ".") {
    if (map[i][j] == "O") {
      map[i][j] = ".";
      map[ni][nj] = "O";
      return [ni, nj];
    }
    return [ni, nj];
  }
  return [i, j];
}

function canMove(map, move, i, j) {
  let ni, nj;
  switch (move) {
    case "<":
      [ni, nj] = [i, j - 1];
      break;
    case ">":
      [ni, nj] = [i, j + 1];
      break;
    case "^":
      [ni, nj] = [i - 1, j];
      break;
    case "v":
      [ni, nj] = [i + 1, j];
      break;
    default:
      return [i, j];
  }
  if (map[ni][nj]=="#") return false;
  if (map[ni][nj]=="." && map[i][j]==".") return true;
  if ((map[ni][nj]=="[" || map[ni][nj]=="]")&&ni==i) return canMove(map,move,ni,nj);
  if ((map[i][j]=="[" || map[i][j]=="]") && ni == i && map[ni][nj]==".") return true;
  if (map[i][j]=="[" && (map[ni][nj]=="." || canMove(map,move,ni,nj)) && (map[ni][nj+1]=="." || canMove(map,move,ni,nj+1))) return true;
  if (map[i][j]=="]" && (map[ni][nj]=="." || canMove(map,move,ni,nj)) && (map[ni][nj-1]=="." || canMove(map,move,ni,nj-1))) return true;
  if (map[i][j]=="[" && map[ni][n])
  if (map[ni][nj]=="[") return (canMove(map,move,ni,nj) && canMove(map,move,ni,nj+1));
  if (map[ni][nj]=="]") return (canMove(map,move,ni,nj) && canMove(map,move,ni,nj-1));
  //okay, we no
 
  return false;
  
}
function doMove2(map, move, i, j) {
    if (!canMove(map,move,i,j)) return [i,j];
    let ni, nj;
    switch (move) {
      case "<":
        [ni, nj] = [i, j - 1];
        break;
      case ">":
        [ni, nj] = [i, j + 1];
        break;
      case "^":
        [ni, nj] = [i - 1, j];
        break;
      case "v":
        [ni, nj] = [i + 1, j];
        break;
      default:
        return [i, j];
    }
    if (map[ni][nj] == "[" || map[ni][nj]=="]") {
      doMove2(map, move, ni, nj);
    }//also need to recursively call if the OTHER half of the box hits a box
    if (map[i][j] == "[" && (move == "^" || move == "v") && (map[ni][nj+1] == "]" || map[ni][nj+1]=="[")) {
        doMove2(map,move,ni,nj+1);
    }
    if (map[i][j] == "]" && (move == "^" || move == "v") && (map[ni][nj-1] == "]" || map[ni][nj-1]=="[")) {
        doMove2(map,move,ni,nj-1);
    }
    if (map[ni][nj] == ".") {
      if ((map[i][j] == "[" || map[i][j]=="]") && (move=="<" || move==">")) {
        map[ni][nj] = map[i][j];
        map[i][j] = ".";
        return [ni, nj];
      }else if ((map[i][j] == "[")) {
        //moving up or down on left side of box
        if ((map[ni][nj+1]==".")) {
            //right side is free too
            map[ni][nj]="[";
            map[ni][nj+1]="]";
            map[i][j]=".";
            map[i][j+1]=".";
            return [ni,nj];
        }else if (map[ni][nj+1] == "#") {
            //can't move
            return [i,j];
        }
      }else if ((map[i][j] == "]")) {
        //moving up or down on left side of box
        if ((map[ni][nj-1]==".")) {
            //right side is free too
            map[ni][nj]="]";
            map[ni][nj-1]="[";
            map[i][j]=".";
            map[i][j-1]=".";
            return [ni,nj];
        }else if (map[ni][nj-1] == "#") {
            //can't move
            return [i,j];
        }
      }
      return [ni, nj];
    }
    return [i, j];
  }


function printMap(map, pos) {
  map[pos[0]][pos[1]] = "@";
  let string = map.map((e) => e.join("")).join("\n");
  string = string.replaceAll("@","\x1b[33m@\x1b[39m");
  console.log(string);
  map[pos[0]][pos[1]] = ".";
}

function boxGPS(map) {
  let total = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == "O") {
        total += 100 * i + j;
      }
    }
  }
  return total;
}

function boxGPS2(map) {
    let total = 0;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == "[") {
          total += 100 * i + j;
        }
      }
    }
    return total;
  }
