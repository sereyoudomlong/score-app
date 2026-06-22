import MatchCard from "@/components/MatchCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { MatchData } from "@/constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
// import * as Watch from "react-native-watch-connectivity";

export default function ScorePage() {
  const [match, setMatch] = useState<MatchData>({
    player1: { name: "John", scores: 0, games: 0, sets: 0, adv: false },
    player2: { name: "Jake", scores: 0, games: 0, sets: 0, adv: false },
    isDuece: false,
    version: 0,
  });

  const addPoint = (player: "player1" | "player2", isDeuce: boolean) => {
    Vibration.vibrate(50);

    if (isDeuce) {
      deuceScore(player);
      return;
    }

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
        version: prev.version + 1,
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
        version: prev.version + 1,
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
      version: prev.version + 1,
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
        version: prev.version + 1,
      }));
      return;
    }

    // if player dont have the adv but score give them adv
    setMatch((prev) => ({
      ...prev,
      [player]: { ...prev[player], adv: true },
      version: prev.version + 1,
    }));
  };

  const resetMatch = () => {
    setMatch({
      player1: { scores: 0, games: 0, sets: 0, adv: false },
      player2: { scores: 0, games: 0, sets: 0, adv: false },
      isDuece: false,
      version: 0,
    });
    // Watch.sendMessage({ action: "RESET_MATCH" });
  };

  const resetScore = () => {
    setMatch((prev) => ({
      ...prev,
      player1: { ...prev.player1, scores: 0, adv: false },
      player2: { ...prev.player2, scores: 0, adv: false },
      isDuece: false,
      version: prev.version + 1,
    }));
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

      <MatchCard></MatchCard>
      <ScoreDisplay matchData={match} onPress={addPoint}></ScoreDisplay>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.resetButton}
          onPress={() => router.navigate("/")}
        >
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
