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
let screen = new Array(6).fill(0).map(() => new Array<string>(40).fill("."));

adds.forEach((value, cycle) => {
  const vertical = Math.floor(cycle / 40);
  const horizontal = cycle - vertical * 40;
  if (horizontal >= x - 1 && horizontal <= x + 1) {
    screen[vertical][horizontal] = "#";
  }
  x = x + value;
});

screen.forEach((line) => console.log(line.join("")));
