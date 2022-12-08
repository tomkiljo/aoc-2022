import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const trees = input.reduce((rows, line) => {
  rows.push(line.split("").map(Number));
  return rows;
}, [] as number[][]);

const height = trees.length;
const width = trees[0].length;
const visible = new Set<string>();

for (let y = 0; y < height; y++) {
  let max = -1;
  for (let x = 0; x < width; x++) {
    if (trees[y][x] > max) {
      visible.add(`${y}:${x}`);
      max = trees[y][x];
    }
  }

  max = -1;
  for (let x = width - 1; x >= 0; x--) {
    if (trees[y][x] > max) {
      visible.add(`${y}:${x}`);
      max = trees[y][x];
    }
  }
}

for (let x = 0; x < width; x++) {
  let max = -1;
  for (let y = 0; y < height; y++) {
    if (trees[y][x] > max) {
      visible.add(`${y}:${x}`);
      max = trees[y][x];
    }
  }
  max = -1;
  for (let y = height - 1; y >= 0; y--) {
    if (trees[y][x] > max) {
      visible.add(`${y}:${x}`);
      max = trees[y][x];
    }
  }
}

console.log(visible.size);
