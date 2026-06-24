import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MatchSetupScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={20} color="#2f80ed" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Match Setup</Text>
        <Pressable
          onPress={() => {}}
          style={[
            styles.headerButton,
            { justifyContent: "flex-end", opacity: 0 },
          ]}
        >
          <Ionicons name="arrow-undo-outline" size={24} color="#2f80ed" />
        </Pressable>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.resetButton}
          onPress={() => router.replace("/live-match")}
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
