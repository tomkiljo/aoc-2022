import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const adds = input.flatMap((line) =>
  line.startsWith("addx") ? [0, Number(line.split(" ")[1])] : [0]
);

let x = 1;
let stength = 0;

adds.forEach((value, index) => {
  const cycle = index + 1;
  if (cycle % 20 === 0 && (cycle / 20) % 2 !== 0) {
    stength = stength + cycle * x;
  }
  x = x + value;
});

console.log(stength);
