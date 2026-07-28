import { MatchData } from "@/constants/types";

export const resetGame = (state: MatchData): MatchData => {
  let newState = { ...state };
  newState = {
    ...newState,
    liveGame: {
      gameID: undefined,
      team1Points: 0,
      team2Points: 0,
      isDeuce: false,
      adv: null,
      gameWon: null,
    },
  };
  return newState;
};
