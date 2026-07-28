import { MatchData } from "@/constants/types";

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
