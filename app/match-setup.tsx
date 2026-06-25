import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MatchSetupScreen() {
  const [isDoubles, setIsDoubles] = useState(false);
  const [t1p1, setT1p1] = useState("");
  const [t1p2, setT1p2] = useState("");
  const [t2p1, setT2p1] = useState("");
  const [t2p2, setT2p2] = useState("");

  const [servingTeam, setServingTeam] = useState<1 | 2>(1);
  const [setsNum, setSetsNum] = useState<1 | 3 | 5>(1);

  return (
    <View style={styles.container}>
      {/* HEADER */}
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

      {/* Match Type Toggle */}
      <Text style={styles.label}>Match Type</Text>

      <View style={styles.toggleRow}>
        {/* Singles Button */}
        <TouchableOpacity
          style={[styles.toggleButton, !isDoubles && styles.activeButton]}
          onPress={() => setIsDoubles(false)}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.toggleText, !isDoubles && styles.activeToggleText]}
          >
            Singles
          </Text>
        </TouchableOpacity>

        {/* Doubles Button */}
        <TouchableOpacity
          style={[styles.toggleButton, isDoubles && styles.activeButton]}
          onPress={() => setIsDoubles(true)}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.toggleText, isDoubles && styles.activeToggleText]}
          >
            Doubles
          </Text>
        </TouchableOpacity>
      </View>

      {/* Temporary state checker so you can see it working */}
      <Text style={{ marginTop: 20, color: "#666" }}>
        Current Selection:{" "}
        {isDoubles ? "Doubles (4 Players)" : "Singles (2 Players)"}
      </Text>

      <Text style={styles.label}>Team 1</Text>
      <TextInput
        style={styles.input}
        placeholder="Default: Player 1"
        value={t1p1}
        onChangeText={setT1p1}
      />
      {isDoubles && (
        <TextInput
          style={styles.input}
          placeholder="Default: Player 3"
          value={t1p2}
          onChangeText={setT1p2}
        />
      )}

      <Text style={styles.label}>Team 2</Text>

      <TextInput
        style={styles.input}
        placeholder="Default: Player 2"
        value={t2p1}
        onChangeText={setT2p1}
      />
      {isDoubles && (
        <TextInput
          style={styles.input}
          placeholder="Default: Player 4"
          value={t2p2}
          onChangeText={setT2p2}
        />
      )}

      <Text style={styles.label}>Who Serves First?</Text>
      <View style={styles.radioGroup}>
        {/* Option 1: Team 1 */}
        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setServingTeam(1)}
          activeOpacity={0.8}
        >
          <View style={styles.radioOuterCircle}>
            {servingTeam === 1 && <View style={styles.radioInnerDot} />}
          </View>
          <Text style={styles.radioLabel}>Team 1</Text>
        </TouchableOpacity>

        {/* Option 2: Team 2 */}
        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setServingTeam(2)}
          activeOpacity={0.8}
        >
          <View style={styles.radioOuterCircle}>
            {servingTeam === 2 && <View style={styles.radioInnerDot} />}
          </View>
          <Text style={styles.radioLabel}>Team 2</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Sets</Text>
      <View style={styles.radioGroup}>
        {/* Option 1: Team 1 */}
        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setSetsNum(1)}
          activeOpacity={0.8}
        >
          <View style={styles.radioOuterCircle}>
            {setsNum === 1 && <View style={styles.radioInnerDot} />}
          </View>
          <Text style={styles.radioLabel}>1 Set</Text>
        </TouchableOpacity>

        {/* Option 2: Team 2 */}
        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setSetsNum(3)}
          activeOpacity={0.8}
        >
          <View style={styles.radioOuterCircle}>
            {setsNum === 3 && <View style={styles.radioInnerDot} />}
          </View>
          <Text style={styles.radioLabel}>3 Sets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioRow}
          onPress={() => setSetsNum(5)}
          activeOpacity={0.8}
        >
          <View style={styles.radioOuterCircle}>
            {setsNum === 5 && <View style={styles.radioInnerDot} />}
          </View>
          <Text style={styles.radioLabel}>5 Sets</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#F2F2F7", // Light grey background container
    borderRadius: 20,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 40,
  },
  activeButton: {
    backgroundColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#8E8E93", // Inactive text color
  },
  activeToggleText: {
    color: "#ffffff", // Active text color
    fontWeight: "600",
  },
  input: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
    gap: 24,
    marginVertical: 10,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  radioOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10, // Perfect circle (half of width/height)
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5, // Perfect inner dot circle
    backgroundColor: "#007AFF", // Fills solid when active
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
});
