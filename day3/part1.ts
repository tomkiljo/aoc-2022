import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const priority = (c: string) =>
  /[a-z]/.test(c) ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38;

const result = input.reduce((sum, line) => {
  const l = line.substring(0, line.length / 2);
  const r = line.substring(line.length / 2);
  const c = l.split("").find((c) => r.includes(c));
  if (!c) return sum;
  return sum + priority(c);
}, 0);

console.log(result);
