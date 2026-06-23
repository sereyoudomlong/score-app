import { GameData, scoreMap } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

type teamID = "team1" | "team2";

interface ScoreDisplayProps {
  gameData: GameData;
  onPress: (team: teamID, isDuece: boolean) => void;
}

export const ScoreDisplay = ({ gameData, onPress }: ScoreDisplayProps) => {
  const showScore = (team: "team1" | "team2") => {
    // 1. Handle the "Advantage" case first (The Exception)
    if (gameData.isDuece && gameData.adv === team) {
      return "AD";
    }

    // 2. Otherwise, just return the standard point (The Default)
    const points =
      team === "team1" ? gameData.team1Points : gameData.team2Points;
    return scoreMap[points];
  };

  return (
    <View style={styles.scoreBoard}>
      <Pressable
        style={styles.playerSection}
        onPress={() => onPress("team1", gameData.isDuece)}
      >
        <Text style={styles.playerLabel}>PLAYER 1</Text>
        <Text style={styles.scoreText}>{showScore("team1")}</Text>
      </Pressable>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["transparent", "rgba(0, 0, 0, 0.15)", "transparent"]}
        style={styles.divider}
      />
      <Pressable
        style={styles.playerSection}
        onPress={() => onPress("team2", gameData.isDuece)}
      >
        <Text style={styles.playerLabel}>PLAYER 2</Text>
        <Text style={styles.scoreText}>{showScore("team2")}</Text>
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
