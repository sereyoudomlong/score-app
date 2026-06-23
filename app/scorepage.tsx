import MatchCard from "@/components/MatchCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import {
  GameData,
  MatchData,
  PlayerData,
  SetData,
  TeamData,
} from "@/constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
// import * as Watch from "react-native-watch-connectivity";

export default function ScorePage() {
  // Mock Data (Replace with actual data fetching logic)
  const [player1, setPlayer1] = useState<PlayerData>({ name: "John" });
  const [player2, setPlayer2] = useState<PlayerData>({ name: "Jake" });
  const [team1, setTeam1] = useState<TeamData>({ players: [player1] });
  const [team2, setTeam2] = useState<TeamData>({ players: [player2] });
  const [liveGame, setLiveGame] = useState<GameData>({
    team1Points: 0,
    team2Points: 0,
    isDuece: false,
    adv: null,
  });

  const [liveSet, setLiveSet] = useState<SetData>({
    team1GamesWon: 0,
    team2GamesWon: 0,
  });

  const [sets, setSets] = useState<SetData[]>();

  const [match, setMatch] = useState<MatchData>({
    team1,
    team2,
    liveGame,
    sets,
    version: 0,
  });

  //DELETE THIS WHEN DONE
  useEffect(() => {
    printData();
  }, [liveGame]);

  //DELETE THIS WHEN DONE
  const printData = () => {
    console.log(
      "=============================== Current Match Data =============================== ",
    );
    console.log("Player 1:", player1);
    console.log("Player 2:", player2);
    console.log("Team 1:", team1);
    console.log("Team 2:", team2);
    console.log("Live Game:", liveGame);
    console.log("Live Set:", liveSet);
    console.log("Sets:", sets);
    console.log("Match:", match);
  };

  const addPoint = (team: "team1" | "team2", isDeuce: boolean) => {
    Vibration.vibrate(50);

    if (isDeuce) {
      deuceScore(team);
      return;
    }

    const p1Next =
      team === "team1" ? liveGame.team1Points + 1 : liveGame.team1Points;
    const p2Next =
      team === "team2" ? liveGame.team2Points + 1 : liveGame.team2Points;

    // check for deuce
    if (p1Next === 3 && p2Next === 3) {
      setLiveGame((prev) => ({
        ...prev,
        team1Points: 3,
        team2Points: 3,
        isDuece: true,
      }));
      return;
    }

    // Check for Win
    if (p1Next === 4) {
      winGame("team1");
    } else if (p2Next === 4) {
      winGame("team2");
    } else {
      setLiveGame((prev) => ({
        ...prev,
        team1Points: team === "team1" ? p1Next : prev.team1Points,
        team2Points: team === "team2" ? p2Next : prev.team2Points,
      }));
    }
  };

  // Scoring logic for deuce
  const deuceScore = (team: "team1" | "team2") => {
    // find the team and opp to compare
    const opponent = team === "team1" ? "team2" : "team1";

    // if player have adv win the game
    if (liveGame.adv === team) {
      winGame(team);
      return;
    } else if (liveGame.adv === opponent) {
      setLiveGame((prev) => ({
        ...prev,
        adv: null,
      }));
    } else if (liveGame.adv === null) {
      setLiveGame((prev) => ({
        ...prev,
        adv: team,
      }));
    }
  };

  const winGame = (team: "team1" | "team2") => {
    // to counteract the async state update of liveGame
    const nextTeam1Games =
      team === "team1" ? liveSet.team1GamesWon + 1 : liveSet.team1GamesWon;
    const nextTeam2Games =
      team === "team2" ? liveSet.team2GamesWon + 1 : liveSet.team2GamesWon;

    setLiveSet((prev) => ({
      ...prev,
      team1GamesWon: nextTeam1Games,
      team2GamesWon: nextTeam2Games,
    }));
    resetGame();

    // Check for Set Win (First to 6 games with at least 2 games difference)
    if (
      (team === "team1" &&
        nextTeam1Games >= 6 &&
        nextTeam1Games - nextTeam2Games >= 2) ||
      (team === "team2" &&
        nextTeam2Games >= 6 &&
        nextTeam2Games - nextTeam1Games >= 2)
    ) {
      winSet(nextTeam1Games, nextTeam2Games);
    }
  };

  const winSet = (t1Games: number, t2Games: number) => {
    const completedSet: SetData = {
      team1GamesWon: t1Games,
      team2GamesWon: t2Games,
    };
    setSets((prev) => [...(prev || []), completedSet]);
    resetSet();
  };

  const resetGame = () => {
    setLiveGame({
      team1Points: 0,
      team2Points: 0,
      isDuece: false,
      adv: null,
    });
  };

  const resetSet = () => {
    setLiveSet({
      team1GamesWon: 0,
      team2GamesWon: 0,
    });
  };

  const resetMatch = () => {
    resetGame();
    resetSet();
    setSets([]);
    setMatch({ team1, team2, liveGame, sets, version: 0 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={20} color="#2f80ed" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Scoreboard</Text>
        <Pressable
          onPress={() => {}}
          style={[styles.headerButton, { justifyContent: "flex-end" }]} // Overrides the default space-between to align this button to the right
        >
          <Ionicons name="arrow-undo-outline" size={24} color="#2f80ed" />
        </Pressable>
      </View>

      <MatchCard liveSet={liveSet} sets={sets} />
      <ScoreDisplay gameData={liveGame} onPress={addPoint}></ScoreDisplay>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.resetButton} onPress={resetMatch}>
          <Text style={styles.resetText}>FINISH</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
    marginBottom: 20,
    marginTop: 44, // <-- Crucial: Pushes the custom header below the iPhone Dynamic Island / Notch
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: 80, // Fixed width guarantees the center title stays perfectly centered
    paddingVertical: 8,
  },
  backText: {
    fontSize: 17,
    color: "#2f80ed",
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "center",
  },
  resetButton: {
    marginBottom: 40,
    padding: 20,
  },
  resetText: {
    color: "#ff4444",
    fontSize: 14,
    fontWeight: "bold",
  },
});
