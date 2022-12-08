import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const trees: number[][] = [];
input.reduce((trees, line) => {
  trees.push(line.split("").map(Number));
  return trees;
}, trees);

const height = trees.length;
const width = trees[0].length;

let maxScore = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const tree = trees[y][x];

    let top = 0;
    for (let yt = y - 1; yt >= 0; yt--) {
      top = top + 1;
      if (trees[yt][x] >= tree) {
        break;
      }
    }

    let bottom = 0;
    for (let yb = y + 1; yb < height; yb++) {
      bottom = bottom + 1;
      if (trees[yb][x] >= tree) {
        break;
      }
    }

    let left = 0;
    for (let xl = x - 1; xl >= 0; xl--) {
      left = left + 1;
      if (trees[y][xl] >= tree) {
        break;
      }
    }

    let right = 0;
    for (let xr = x + 1; xr < width; xr++) {
      right = right + 1;
      if (trees[y][xr] >= tree) {
        break;
      }
    }

    const score = top * bottom * left * right;
    if (score > maxScore) {
      maxScore = score;
    }
  }
}

console.log(maxScore);
