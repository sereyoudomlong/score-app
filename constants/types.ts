export type PlayerData = {
  score: number;
  games: number;
  sets: number;
  adv: boolean;
};

export type MatchData = {
  player1: PlayerData;
  player2: PlayerData;
  isDuece: boolean;
};

export const scoreMap = ["0", "15", "30", "40", "Game"];
