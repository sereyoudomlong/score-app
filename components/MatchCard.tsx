import { StyleSheet, Text, View } from "react-native";

/**
 * Component for match card, below is an example:
 * --------------------------------------
 * | 18 June, 2026             00:00:00 |
 * | player1                    1  2  3 |
 * | player2                    0  1  4 |
 * --------------------------------------
 */

export default function MatchCard() {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerLeftText}>18 June, 2026</Text>
        <Text style={styles.headerRightText}>00:00:00</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.playerRow}>
          <View style={styles.playerInfo}>
            {/* todo: Replace with actual player name */}
            <Text style={styles.playerName}>John</Text>
          </View>
          <View style={styles.scoreContainer}>
            {/* todo: Replace with actual set scores */}
            <Text style={styles.scoreText}>1</Text>
            <Text style={styles.scoreText}>2</Text>
            <Text style={styles.scoreText}>3</Text>
          </View>
        </View>
        <View style={styles.playerRow}>
          <View style={styles.playerInfo}>
            {/* todo: Replace with actual player name */}
            <Text style={styles.playerName}>Player 2</Text>
          </View>
          <View style={styles.scoreContainer}>
            {/* todo: Replace with actual set scores */}
            <Text style={styles.scoreText}>6</Text>
            <Text style={styles.scoreText}>6</Text>
            <Text style={styles.scoreText}>6</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: "#2f80ed",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 45,
  },
  headerLeftText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerRightText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  cardBody: {
    padding: 10,
    gap: 12,
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 20,
    paddingRight: 8,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    width: 14, // <-- Forces an identical column block width
    textAlign: "center", // <-- Centers the digit inside that fixed block
  },
});
