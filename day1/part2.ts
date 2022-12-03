import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const result = input
  .reduce((elfs, line) => {
    if (line !== "") {
      elfs[elfs.length - 1] += parseInt(line);
    } else {
      elfs.push(0);
    }
    return elfs;
  }, new Array<number>(0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);

console.log(result);
