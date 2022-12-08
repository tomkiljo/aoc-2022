import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

class Node {
  children: Map<string, Node> = new Map();
  value = 0;

  constructor(readonly key: string, readonly parent: Node | null = null) {}

  dir(dir: string) {
    if (!this.children.has(dir)) {
      this.children.set(dir, new Node(dir, this));
    }
  }

  file(size: number) {
    this.value = this.value + size;
  }

  push(dir: string) {
    let child = this.children.get(dir);
    if (!child) {
      child = new Node(dir, this);
      this.children.set(dir, child);
    }
    return child;
  }

  pop() {
    return this.parent ?? this;
  }

  root(): Node {
    return this.parent === null ? this : this.parent.root();
  }

  size(): number {
    return [...this.children.values()].reduce(
      (sum, child) => sum + child.size(),
      this.value
    );
  }

  filter(predicate: (node: Node) => boolean): Node[] {
    const filtered: Node[] = [];
    if (predicate(this)) {
      filtered.push(this);
    }
    [...this.children.values()]
      .flatMap((child) => child.filter(predicate))
      .forEach((child) => filtered.push(child));
    return filtered;
  }
}

const root = new Node("/");

input.reduce((node, line) => {
  const parts = line.split(" ");
  if (/^\$ cd/.test(line)) {
    const [, , dir] = parts;
    if (dir === "..") {
      return node.pop();
    } else if (dir === "/") {
      return node.root();
    } else {
      return node.push(dir);
    }
  }

  if (/^dir/.test(line)) {
    const [, dir] = parts;
    node.dir(dir);
  }

  if (/^\d+/.test(line)) {
    const [size] = parts;
    node.file(Number(size));
  }

  return node;
}, root);

const TOTAL_SPACE = 70000000 as const;
const REQUIRED_SPACE = 30000000 as const;

const usedSpace = root.size();
const freeSpace = TOTAL_SPACE - usedSpace;
const needSpace = REQUIRED_SPACE - freeSpace;

console.log(
  Math.min(
    ...root
      .filter((node) => node.size() >= needSpace)
      .map((node) => node.size())
  )
);
