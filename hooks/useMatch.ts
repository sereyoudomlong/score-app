import { TeamData } from "@/constants/types";
import { createInitialMatchData, matchReducer } from "@/reducers/matchReducers";
import { useEffect, useReducer } from "react";

export function useMatch(teams: [TeamData, TeamData]) {
  const [match, dispatch] = useReducer(
    matchReducer,
    teams,
    createInitialMatchData,
  );

  // put a delay for when user win a game to show Game! text before resetting
  useEffect(() => {
    if (match.liveGame.gameWon !== null) {
      const timer = setTimeout(() => {
        dispatch({ type: "RESET_GAME" });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [match.liveGame.gameWon]);

  const scorePoint = (team: "team1" | "team2") => {
    dispatch({ type: "SCORE_POINT", team });
  };

  const undo = () => {
    dispatch({ type: "UNDO" });
  };

  return { match, scorePoint, undo };
}
