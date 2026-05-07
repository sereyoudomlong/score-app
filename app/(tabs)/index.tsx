import { ScoreDisplay } from "@/components/ScoreDisplay";
import { MatchData } from "@/constants/types";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import * as Watch from "react-native-watch-connectivity";

export default function TabOneScreen() {
  const [match, setMatch] = useState<MatchData>({
    player1: { scores: 0, games: 0, sets: 0, adv: false },
    player2: { scores: 0, games: 0, sets: 0, adv: false },
    isDuece: false,
  });

  useEffect(() => {
    console.log("Syncing to Watch:");
    // Watch.updateApplicationContext(match);
    Watch.sendMessage(
      match,
      (reply) => {
        console.log("Watch received!");
      },
      (err) => {
        console.log("Watch unreachable, syncing via Context instead.");
        Watch.updateApplicationContext(match);
      },
    );
  }, [match]);

  const addPoint = (player: "player1" | "player2") => {
    Vibration.vibrate(50);

    const p1Next =
      player === "player1" ? match.player1.scores + 1 : match.player1.scores;
    const p2Next =
      player === "player2" ? match.player2.scores + 1 : match.player2.scores;

    // check for deuce
    if (p1Next === 3 && p2Next === 3) {
      setMatch((prev) => ({
        ...prev,
        player1: { ...prev.player1, scores: 3 },
        player2: { ...prev.player2, scores: 3 },
        isDuece: true,
      }));
      return;
    }

    // Check for Win
    if (p1Next === 4) {
      winGame("player1");
    } else if (p2Next === 4) {
      winGame("player2");
    } else {
      setMatch((prev) => ({
        ...prev,
        [player]: {
          ...prev[player],
          scores: player === "player1" ? p1Next : p2Next,
        },
      }));
    }
  };

  const winGame = (player: "player1" | "player2") => {
    setMatch((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        games: prev[player].games + 1,
      },
    }));
    resetScore();
  };

  // Scoring logic for deuce
  const deuceScore = (player: "player1" | "player2") => {
    // find the player and opp to compare
    const opponent = player === "player1" ? "player2" : "player1";

    // if player have adv win the game
    if (match[player].adv) {
      winGame(player);
      return;
    }

    // else reset the adv point
    if (match[opponent].adv) {
      setMatch((prev) => ({
        ...prev,
        player1: { ...prev.player1, adv: false },
        player2: { ...prev.player2, adv: false },
      }));
      return;
    }

    // if player dont have the adv but score give them adv
    setMatch((prev) => ({
      ...prev,
      [player]: { ...prev[player], adv: true },
    }));
  };

  const resetMatch = () => {
    setMatch({
      player1: { scores: 0, games: 0, sets: 0, adv: false },
      player2: { scores: 0, games: 0, sets: 0, adv: false },
      isDuece: false,
    });
  };

  const resetScore = () => {
    setMatch((prev) => ({
      ...prev,
      player1: { ...prev.player1, scores: 0, adv: false },
      player2: { ...prev.player2, scores: 0, adv: false },
      isDuece: false,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MATCH POINT</Text>
      <ScoreDisplay
        matchData={match}
        onPress={match.isDuece ? deuceScore : addPoint}
      />
      <Pressable style={styles.resetButton} onPress={resetMatch}>
        <Text style={styles.resetText}>RESET MATCH</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 60,
  },
  header: {
    color: "#32CD32",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreBoard: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  playerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  playerLabel: {
    color: "#888",
    fontSize: 14,
    marginBottom: 10,
  },
  scoreText: {
    color: "#888",
    fontSize: 120,
    fontWeight: "bold",
  },
  gameScoreText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    right: 20,
  },
  divider: {
    height: 2,
    backgroundColor: "#32CD32",
    width: "100%",
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
