import MatchCard from "@/components/MatchCard";
import { StyleSheet, View } from "react-native";
// import * as Watch from "react-native-watch-connectivity";

export default function ScorePage() {
  return (
    <View style={styles.container}>
      <MatchCard></MatchCard>
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
