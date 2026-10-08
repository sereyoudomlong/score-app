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
  firstServer: "team1" | "team2"; // who served first in this game; the other team serves the next game
  isTiebreak?: boolean; // true if this game is a tiebreak game (used for display)
};

export type SetData = {
  setID?: string;
  team1GamesWon: number;
  team2GamesWon: number;
  setWinner?: "team1" | "team2";
};

export type MatchHistoryData = {
  liveGame: GameData;
  sets: SetData[];
  currentSetIndex: number;
  servingTeam: "team1" | "team2";
  isTiebreaker: boolean;
  matchWinner?: TeamData | null;
};

export type MatchData = {
  matchID?: string;
  team1: TeamData;
  team2: TeamData;
  bestOf: number;
  date: Date;
  isDouble: boolean;
  liveGame: GameData;
  currentSetIndex: number;
  sets: SetData[];
  history: MatchHistoryData[];
  duration: number;
  servingTeam: "team1" | "team2";
  startingServer: "team1" | "team2"; // who was picked to serve first on the setup screen (used for rematch)
  matchWinner?: TeamData | null;
  isTiebreaker: boolean;
  version: number;
};

export type MatchAction =
  | { type: "SCORE_POINT"; team: "team1" | "team2" }
  | { type: "RESET_GAME" }
  | { type: "UNDO" }
  | { type: "RESET_MATCH" };

export const scoreMap = ["0", "15", "30", "40", "Game"];
