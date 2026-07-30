import { MatchData, SetData } from "@/constants/types";

export const winGame = (
  team: "team1" | "team2",
  state: MatchData,
): MatchData => {
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
    return winSet(newState, team);
  }

  console.log(newState);
  return newState;
};

const winSet = (state: MatchData, team: "team1" | "team2"): MatchData => {
  let newState = { ...state };

  //update the current set to add the winner to it
  let updatedSet = [...newState.sets];
  updatedSet[newState.currentSetIndex] = {
    ...updatedSet[newState.currentSetIndex],
    setWinner: team,
  };

  newState = {
    ...newState,
    sets: updatedSet,
  };

  // check if user have played enough set to determine the winner
  let winner = checkMatchWinner(newState.sets, newState.bestOf);

  if (winner !== null) {
    return winMatch(newState, winner);
  }

  //update the set list to add another set and increase the set index by 1
  newState = {
    ...newState,
    sets: [...newState.sets, { team1GamesWon: 0, team2GamesWon: 0 }],
    currentSetIndex: newState.currentSetIndex + 1,
  };

  return newState;
};

const checkMatchWinner = (
  sets: SetData[],
  bestOf: number,
): "team1" | "team2" | null => {
  const setsNeedToWin = Math.ceil(bestOf / 2);

  let team1SetsWon = 0;
  let team2SetsWon = 0;

  for (let i of sets) {
    if (i.setWinner === "team1") team1SetsWon++;
    if (i.setWinner === "team2") team2SetsWon++;
  }

  if (team1SetsWon >= setsNeedToWin) return "team1";
  if (team2SetsWon >= setsNeedToWin) return "team2";

  return null;
};

const winMatch = (state: MatchData, team: "team1" | "team2"): MatchData => {
  let newState = { ...state };
  newState = {
    ...newState,
    matchWinner: team === "team1" ? newState.team1 : newState.team2,
  };

  return newState;
};
