import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const result = input.reduce((sum, line) => {
  const [a1, b1, a2, b2] = line.split(/[^\d]+/).map(Number);
  if ((a1 >= a2 && a1 <= b2) || (a2 >= a1 && a2 <= b1)) {
    return sum + 1;
  }
  return sum;
}, 0);

console.log(result);
