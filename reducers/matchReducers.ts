import { MatchAction, MatchData, TeamData } from "../constants/types";
import { resetGame, undo } from "./resetLogic";
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
    history: [],
    version: 0,
  };
}

export function matchReducer(state: MatchData, action: MatchAction): MatchData {
  switch (action.type) {
    case "SCORE_POINT":
      const snapshot = {
        liveGame: state.liveGame,
        sets: state.sets,
        currentSetIndex: state.currentSetIndex,
      };

      let newState = addPoint(action.team, state);

      return { ...newState, history: [...state.history, snapshot] };

    case "RESET_GAME":
      return resetGame(state);

    case "UNDO":
      return undo(state);

    default:
      return state;
  }
}
