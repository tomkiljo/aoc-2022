import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
);

for (let i = 3; i < input.length; i++) {
  const buffer = [...input.slice(i - 3, i + 1)];
  const different = buffer.every((char, index, arr) => {
    return arr.indexOf(char, index + 1) < 0;
  });
  if (different) {
    console.log(i + 1);
    break;
  }
}
