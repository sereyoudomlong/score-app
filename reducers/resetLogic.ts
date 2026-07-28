import { MatchData } from "@/constants/types";

export const undo = (state: MatchData): MatchData => {
  if (state.history.length == 0) {
    return state;
  }

  // get previous snap shot and update the history by removing the last on in the array
  let previousSnapShot = state.history[state.history.length - 1];
  let updatedHistory = state.history.slice(0, -1);

  return {
    ...state,
    liveGame: previousSnapShot.liveGame,
    sets: previousSnapShot.sets,
    currentSetIndex: previousSnapShot.currentSetIndex,
    history: updatedHistory,
  };
};

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
