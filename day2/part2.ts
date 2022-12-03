import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const input = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "input.txt"),
  "utf-8"
).split(/\r?\n/);

const MoveScore = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
} as const;

const OutcomeScore = {
  Lose: 0,
  Draw: 3,
  Win: 6,
} as const;

const ElfMove = {
  A: MoveScore.Rock,
  B: MoveScore.Paper,
  C: MoveScore.Scissors,
} as const;
type ElfMove = keyof typeof ElfMove;

const Outcome = {
  X: OutcomeScore.Lose,
  Y: OutcomeScore.Draw,
  Z: OutcomeScore.Win,
} as const;
type Outcome = keyof typeof Outcome;

const Scores = {
  [MoveScore.Rock]: {
    [OutcomeScore.Lose]: MoveScore.Scissors,
    [OutcomeScore.Draw]: MoveScore.Rock,
    [OutcomeScore.Win]: MoveScore.Paper,
  },
  [MoveScore.Paper]: {
    [OutcomeScore.Lose]: MoveScore.Rock,
    [OutcomeScore.Draw]: MoveScore.Paper,
    [OutcomeScore.Win]: MoveScore.Scissors,
  },
  [MoveScore.Scissors]: {
    [OutcomeScore.Lose]: MoveScore.Paper,
    [OutcomeScore.Draw]: MoveScore.Scissors,
    [OutcomeScore.Win]: MoveScore.Rock,
  },
};

const result = input.reduce((score, line) => {
  const elfMove = ElfMove[line.split(" ")[0] as ElfMove];
  const outcome = Outcome[line.split(" ")[1] as Outcome];
  return score + outcome + Scores[elfMove][outcome];
}, 0);

console.log(result);
