import { MatchData, scoreMap } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PlayerID = "player1" | "player2";

interface ScoreDisplayProps {
  matchData: MatchData;
  onPress: (player: PlayerID, isDuece: boolean) => void;
}

export const ScoreDisplay = ({ matchData, onPress }: ScoreDisplayProps) => {
  const showScore = (player: "player1" | "player2") => {
    // 1. Handle the "Advantage" case first (The Exception)
    if (matchData.isDuece && matchData[player].adv) {
      return "AD";
    }

    // 2. Otherwise, just return the standard point (The Default)
    const points =
      player === "player1"
        ? matchData.player1.scores
        : matchData.player2.scores;
    return scoreMap[points];
  };

  return (
    <View style={styles.scoreBoard}>
      <Pressable
        style={styles.playerSection}
        onPress={() => onPress("player1", matchData.isDuece)}
      >
        <Text style={styles.playerLabel}>PLAYER 1</Text>
        <Text style={styles.scoreText}>{showScore("player1")}</Text>
      </Pressable>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["transparent", "rgba(0, 0, 0, 0.15)", "transparent"]}
        style={styles.divider}
      />
      <Pressable
        style={styles.playerSection}
        onPress={() => onPress("player2", matchData.isDuece)}
      >
        <Text style={styles.playerLabel}>PLAYER 2</Text>
        <Text style={styles.scoreText}>{showScore("player2")}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBoard: {
    flex: 1,
    width: "100%",
    height: "auto",
    flexDirection: "column",
  },
  playerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: "70%", // Keeps it inset so it doesn't touch the absolute edges of the phone
    height: 2, // The thickness in the exact middle
    marginVertical: 30, // Gives the scores and bottom controls room to breathe
    alignSelf: "center", // Centers the divider within the parent container
  },
});
