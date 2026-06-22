export type PlayerData = {
  name?: string;
  scores: number;
  games: number;
  sets: number;
  adv: boolean;
};

export type MatchData = {
  player1: PlayerData;
  player2: PlayerData;
  isDuece: boolean;
  version: number;
};

export const scoreMap = ["0", "15", "30", "40", "Game"];
