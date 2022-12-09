import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
)
  .split(/\r?\n/)
  .map((line) => line.split(" "))
  .map(([dir, steps]) => [dir as Direction, Number(steps)] satisfies Move);

type Move = [dir: Direction, steps: Number];
type Point = [x: number, y: number];
const Direction = {
  Right: "R",
  Left: "L",
  Up: "U",
  Down: "D",
} as const;
type Direction = typeof Direction[keyof typeof Direction];

const moveHead = (head: Point, dir: Direction) => {
  if (dir === Direction.Right) head[0]++;
  if (dir === Direction.Left) head[0]--;
  if (dir === Direction.Up) head[1]++;
  if (dir === Direction.Down) head[1]--;
};

const moveTail = (head: Point, tail: Point) => {
  const dx = head[0] - tail[0];
  const dy = head[1] - tail[1];
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    tail[0] += Math.sign(dx);
    tail[1] += Math.sign(dy);
  }
};

const head: Point = [0, 0];
const tails: Point[] = [...new Array(9)].map(() => [0, 0]);
const visited = new Set<string>();

input.forEach(([dir, steps]) =>
  [...new Array(steps)].forEach(() => {
    moveHead(head, dir);
    tails.forEach((tail, index) => {
      moveTail(index > 0 ? tails[index - 1] : head, tail);
    });
    visited.add(tails[tails.length - 1].toString());
  })
);

console.log(visited.size);
