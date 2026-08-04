import { MatchData } from "@/constants/types";
import { Vibration } from "react-native";
import { winGame } from "./setLogic";

export const addPoint = (
  team: "team1" | "team2",
  state: MatchData,
): MatchData => {
  Vibration.vibrate(50);

  // 1. Calculate new points
  const nextP1 =
    team === "team1"
      ? state.liveGame.team1Points + 1
      : state.liveGame.team1Points;
  const nextP2 =
    team === "team2"
      ? state.liveGame.team2Points + 1
      : state.liveGame.team2Points;

  let newState = {
    ...state,
    liveGame: { ...state.liveGame, team1Points: nextP1, team2Points: nextP2 },
  };

  // if it is a tiebreaker
  if (state.isTiebreaker) {
    // check game win condition (score over 7 and ahead by 2 point)
    if (Math.abs(nextP1 - nextP2) >= 2 && (nextP1 >= 7 || nextP2 >= 7)) {
      return winGame(team, newState);
    }
    return newState;
  }

  // 2. Check for Win, add a new set to list of sets, then move the setIndex by 1
  if (nextP1 === 4 || nextP2 === 4) {
    newState = winGame(team, newState);
  }

  // 3. Check for Deuce transition
  if (nextP1 === 3 && nextP2 === 3) {
    newState = {
      ...newState,
      liveGame: { ...newState.liveGame, isDeuce: true },
    };
  }

  // 5. set the newState update
  return newState;
};

// Scoring logic for deuce
const deuceScore = (team: "team1" | "team2", state: MatchData): MatchData => {
  // find the team and opp to compare
  const opponent = team === "team1" ? "team2" : "team1";

  let newState = { ...state };
  // if player have adv win the game
  if (state.liveGame.adv === team) {
    return winGame(team, state);
  } else if (state.liveGame.adv === opponent) {
    newState = {
      ...newState,
      liveGame: { ...newState.liveGame, adv: null },
    };
  } else if (state.liveGame.adv === null) {
    newState = { ...newState, liveGame: { ...newState.liveGame, adv: team } };
  }
  return newState;
};
