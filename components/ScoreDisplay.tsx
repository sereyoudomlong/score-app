import { MatchData, scoreMap } from "@/constants/types";
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
        <Text style={[styles.gameScoreText, { bottom: 50 }]}>
          {matchData.player1.games}
        </Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable
        style={styles.playerSection}
        onPress={() => onPress("player2", matchData.isDuece)}
      >
        <Text style={styles.playerLabel}>PLAYER 2</Text>
        <Text style={styles.scoreText}>{showScore("player2")}</Text>
        <Text style={[styles.gameScoreText, { top: 50 }]}>
          {matchData.player2.games}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
