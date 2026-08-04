import { MatchData } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

/**
 * Component for match card, below is an example:
 * --------------------------------------
 * | 18 June, 2026             00:00:00 |
 * | player1                    1  2  3 |
 * | player2                    0  1  4 |
 * --------------------------------------
 */

interface MatchCardProps {
  match: MatchData;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerLeftText}>
          {match.isDouble ? "Double" : "Single"} BO{match.bestOf}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.playerRow}>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{match.team1.name}</Text>
            <Ionicons
              name="tennisball-outline"
              size={15}
              color={match.servingTeam === "team1" ? "#34C759" : "#fff"}
            />
          </View>
          <View style={styles.scoreContainer}>
            {match.sets?.map((set, index) => (
              <Text key={index} style={styles.scoreText}>
                {set.team1GamesWon}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.playerRow}>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{match.team2.name}</Text>
            <Ionicons
              name="tennisball-outline"
              size={15}
              color={match.servingTeam === "team2" ? "#34C759" : "#fff"}
            />
          </View>
          <View style={styles.scoreContainer}>
            {match.sets?.map((set, index) => (
              <Text key={index} style={styles.scoreText}>
                {set.team2GamesWon}
              </Text>
            ))}
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

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    gap: 5,
  },
  playerName: {
    fontSize: 14,
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
