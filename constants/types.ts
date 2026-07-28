export type PlayerData = {
  id?: string;
  name: string;
};

export type TeamData = {
  id?: string;
  name: string;
  players: PlayerData[];
};

export type GameData = {
  gameID?: string;
  team1Points: number;
  team2Points: number;
  isDeuce: boolean;
  adv?: "team1" | "team2" | null;
  gameWon?: "team1" | "team2" | null;
};

export type SetData = {
  setID?: string;
  team1GamesWon: number;
  team2GamesWon: number;
};

export type MatchData = {
  matchID?: string;
  team1: TeamData;
  team2: TeamData;
  liveGame: GameData;
  currentSetIndex: number;
  sets: SetData[];
  version: number;
};

export type MatchAction =
  | { type: "SCORE_POINT"; team: "team1" | "team2" }
  | { type: "RESET_GAME" };

export const scoreMap = ["0", "15", "30", "40", "Game"];
