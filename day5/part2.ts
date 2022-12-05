import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const isConf = (line: string) => /^\s*\[/.test(line);
const isMove = (line: string) => /^move/.test(line);
const offsets = [1, 5, 9, 13, 17, 21, 25, 29, 33] as const;

const result = input
  .reduce(
    (stacks, line) => {
      if (isConf(line)) {
        offsets
          .map((offset) => line[offset])
          .forEach(
            (crate, index) => crate !== " " && stacks[index].push(crate)
          );
      } else if (isMove(line)) {
        const [_, num, from, to] = (
          line.match(/^move (\d+) from (\d+) to (\d+)/) ?? []
        ).map(Number);
        stacks[to - 1].unshift(...stacks[from - 1].splice(0, num));
      }
      return stacks;
    },
    [...Array(9)].map(() => Array<string>())
  )
  .reduce((top, stack) => top + stack[0], "");

console.log(result);
