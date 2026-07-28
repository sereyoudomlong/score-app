import { MatchAction, MatchData, TeamData } from "../constants/types";
import { resetGame } from "./resetLogic";
import { addPoint } from "./scoringLogic";

export function createInitialMatchData(
  team: [team1: TeamData, team2: TeamData],
): MatchData {
  return {
    matchID: undefined,
    team1: team[0],
    team2: team[1],
    liveGame: {
      gameID: undefined,
      team1Points: 0,
      team2Points: 0,
      isDeuce: false,
      adv: null,
      gameWon: null,
    },
    currentSetIndex: 0,
    sets: [{ team1GamesWon: 0, team2GamesWon: 0 }],
    version: 0,
  };
}

export function matchReducer(state: MatchData, action: MatchAction): MatchData {
  switch (action.type) {
    case "SCORE_POINT":
      return addPoint(action.team, state);

    case "RESET_GAME":
      return resetGame(state);

    default:
      return state;
  }
}
