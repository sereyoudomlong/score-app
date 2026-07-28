import MatchCard from "@/components/MatchCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { PlayerData, TeamData } from "@/constants/types";
import { useMatch } from "@/hooks/useMatch";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
// import * as Watch from "react-native-watch-connectivity";

export default function LiveMatchScreen() {
  // Mock Data (Replace with actual data fetching logic)
  const [player1, setPlayer1] = useState<PlayerData>({ name: "John" });
  const [player2, setPlayer2] = useState<PlayerData>({ name: "Jake" });
  const [player3, setPlayer3] = useState<PlayerData>({ name: "Jane" });
  const [player4, setPlayer4] = useState<PlayerData>({ name: "Jill" });

  const team1: TeamData = {
    players: [player1, player3],
    name: `${player1.name} & ${player3.name}`,
  };

  const team2: TeamData = {
    players: [player2, player4],
    name: `${player2.name} & ${player4.name}`,
  };

  const { match, scorePoint } = useMatch([team1, team2]);

  //DELETE THIS WHEN DONE
  useEffect(() => {
    printData();
  }, [match.liveGame]);

  //DELETE THIS WHEN DONE
  const printData = () => {
    console.log(
      "=============================== Current Match Data =============================== ",
    );
    console.log("Player 1:", player1);
    console.log("Player 2:", player2);
    console.log("Team 1:", team1);
    console.log("Team 2:", team2);
    console.log("Live Game:", match.liveGame);
    console.log("Live Set:", match.sets[match.currentSetIndex]);
    console.log("Sets:", match.sets);
    console.log("Match:", match);
  };

  const resetGame = () => {};

  const resetSet = () => {};

  const resetMatch = () => {};

  const navigation = useNavigation();

  const handleBackToHistory = () => {
    // 1. Force the current stack screen to animate out to the right
    navigation.setOptions({
      animation: "slide_from_left",
    });

    // 2. Head back to your homepage list
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      {/*TODO? make this header in to a component*/}
      <View style={styles.pageHeader}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={20} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Scoreboard</Text>
        <Pressable
          onPress={() => {}}
          style={[styles.headerButton, { justifyContent: "flex-end" }]} // Overrides the default space-between to align this button to the right
        >
          <Ionicons name="arrow-undo-outline" size={24} color="#000" />
        </Pressable>
      </View>

      <MatchCard
        liveSet={match.sets[match.currentSetIndex]}
        sets={match.sets}
        team1={team1}
        team2={team2}
      />
      <ScoreDisplay
        team1={team1}
        team2={team2}
        gameData={match.liveGame}
        onPress={scorePoint}
      ></ScoreDisplay>
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
    color: "#000",
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
