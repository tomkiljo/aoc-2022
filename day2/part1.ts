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

const PlayerMove = {
  X: MoveScore.Rock,
  Y: MoveScore.Paper,
  Z: MoveScore.Scissors,
} as const;
type PlayerMove = keyof typeof PlayerMove;

const Scores = {
  [MoveScore.Rock]: {
    [MoveScore.Rock]: OutcomeScore.Draw,
    [MoveScore.Paper]: OutcomeScore.Win,
    [MoveScore.Scissors]: OutcomeScore.Lose,
  },
  [MoveScore.Paper]: {
    [MoveScore.Rock]: OutcomeScore.Lose,
    [MoveScore.Paper]: OutcomeScore.Draw,
    [MoveScore.Scissors]: OutcomeScore.Win,
  },
  [MoveScore.Scissors]: {
    [MoveScore.Rock]: OutcomeScore.Win,
    [MoveScore.Paper]: OutcomeScore.Lose,
    [MoveScore.Scissors]: OutcomeScore.Draw,
  },
};

const result = input.reduce((score, line) => {
  const elfMove = ElfMove[line.split(" ")[0] as ElfMove];
  const playerMove = PlayerMove[line.split(" ")[1] as PlayerMove];
  return score + playerMove + Scores[elfMove][playerMove];
}, 0);

console.log(result);
