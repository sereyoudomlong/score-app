import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * Landing page for the app. Contains:
 * - Card with match summary (players, scores, date)
 *      + Card have different color based on match continuity
 * - Button start Match (navigate to scoreboard)
 * - Edit match history (navigate to match history screen)
 */

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Select a tab to get started!</Text>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.navigate("/match-setup")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // Gives the button a nice mobile shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 34, // Keeps the plus aligned vertically
  },
});
