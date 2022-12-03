import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const chunkSize = 3 as const;
const priority = (c: string) =>
  /[a-z]/.test(c) ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38;

const result = input
  .reduce((chunks, line, index) => {
    if (index % chunkSize === 0) chunks.push([]);
    chunks[chunks.length - 1].push(line);
    return chunks;
  }, new Array<string[]>())
  .reduce((sum, chunk) => {
    const [x, y, z] = chunk;
    const c = x.split("").find((c) => y.includes(c) && z.includes(c));
    if (!c) return sum;
    return sum + priority(c);
  }, 0);

console.log(result);
