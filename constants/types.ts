export type PlayerData = {
  id?: string;
  name: string;
};

export type TeamData = {
  id?: string;
  players: PlayerData[];
};

export type GameData = {
  gameID?: string;
  team1Points: number;
  team2Points: number;
  isDuece: boolean;
  adv?: "team1" | "team2" | null;
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
  sets: SetData[] | undefined;
  version: number;
};

export const scoreMap = ["0", "15", "30", "40", "Game"];
