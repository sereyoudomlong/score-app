import { Vibration } from "react-native";
import { MatchAction, MatchData, TeamData } from "../constants/types";

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

const addPoint = (team: "team1" | "team2", state: MatchData): MatchData => {
  Vibration.vibrate(50);

  if (state.liveGame.isDeuce) {
    return deuceScore(team, state);
  }
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

const winGame = (team: "team1" | "team2", state: MatchData): MatchData => {
  console.log("lalallalalalala");
  const currentIndex = state.currentSetIndex;
  let newState = { ...state };
  let updatedSet = [...newState.sets];

  // calculate the amount of game the team had won
  const nextTeam1Games =
    team === "team1"
      ? state.sets[currentIndex].team1GamesWon + 1
      : state.sets[currentIndex].team1GamesWon;
  const nextTeam2Games =
    team === "team2"
      ? state.sets[currentIndex].team2GamesWon + 1
      : state.sets[currentIndex].team2GamesWon;

  //update the set index
  updatedSet[currentIndex] = {
    ...updatedSet[currentIndex],
    team1GamesWon: nextTeam1Games,
    team2GamesWon: nextTeam2Games,
  };

  newState = {
    ...newState,
    sets: updatedSet,
    liveGame: { ...newState.liveGame, gameWon: team },
  };

  // check if the next game won value is enough to win the set
  if (
    (team === "team1" &&
      nextTeam1Games >= 6 &&
      nextTeam1Games - nextTeam2Games >= 2) ||
    (team === "team2" &&
      nextTeam2Games >= 6 &&
      nextTeam2Games - nextTeam1Games >= 2)
  ) {
    return winSet(newState);
  }

  console.log(newState);
  return newState;
};

const winSet = (state: MatchData): MatchData => {
  let newState = { ...state };

  //update the set list to add another set and increase the set index by 1
  newState = {
    ...newState,
    sets: [...newState.sets, { team1GamesWon: 0, team2GamesWon: 0 }],
    currentSetIndex: newState.currentSetIndex + 1,
  };
  return newState;
};

const resetGame = (state: MatchData): MatchData => {
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
