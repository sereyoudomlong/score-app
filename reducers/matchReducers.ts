import { MatchAction, MatchData, TeamData } from "../constants/types";
import { resetGame, undo } from "./resetLogic";
import { addPoint } from "./scoringLogic";

export type MatchInitArgs = {
  teams: [TeamData, TeamData];
  bestOf: number;
  isDouble: boolean;
};

export function createInitialMatchData(args: MatchInitArgs): MatchData {
  return {
    matchID: undefined,
    team1: args.teams[0],
    team2: args.teams[1],
    bestOf: args.bestOf,
    isDouble: args.isDouble,
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
    duration: 0,
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
