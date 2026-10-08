import MatchCard from "@/components/MatchCard";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { PlayerData, TeamData } from "@/constants/types";
import { useMatch } from "@/hooks/useMatch";
import { useMatchDB } from "@/hooks/useMatchDB";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  NavigationAction,
  usePreventRemove,
} from "@react-navigation/native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LiveMatchScreen() {
  const { isDouble, t1p1, t1p2, t2p1, t2p2, servingTeam, setsNum } =
    useLocalSearchParams<{
      isDouble: string;
      t1p1: string;
      t1p2?: string;
      t2p1: string;
      t2p2?: string;
      servingTeam: "team1" | "team2";
      setsNum: string;
    }>();

  const [team1Players, setTeam1Players] = useState<PlayerData[]>(() => {
    const players = [{ name: t1p1 }];
    if (t1p2) players.push({ name: t1p2 });
    return players;
  });

  const [team2Players, setTeam2Players] = useState<PlayerData[]>(() => {
    const players = [{ name: t2p1 }];
    if (t2p2) players.push({ name: t2p2 });
    return players;
  });

  const team1: TeamData = {
    players: team1Players,
    name: team1Players.length > 1 ? `${t1p1} & ${t1p2}` : t1p1,
  };

  const team2: TeamData = {
    players: team2Players,
    name: team2Players.length > 1 ? `${t2p1} & ${t2p2}` : t2p1,
  };

  const { match, scorePoint, undo, resetMatch } = useMatch(
    [team1, team2],
    Number(setsNum),
    isDouble === "true" ? true : false,
    servingTeam,
  );

  const { saveCompletedMatch, deleteAllMatches } = useMatchDB();

  // Save the match automatically, once, as soon as it has a winner.
  // The buttons in the "Match Over" modal then don't need to save,
  // so Rematch keeps the finished match and double-tapping Home can't save twice.
  const savedRef = useRef(false);
  useEffect(() => {
    if (match.matchWinner && !savedRef.current) {
      savedRef.current = true;
      saveCompletedMatch(match);
    }
    // a rematch clears the winner, so the next match can be saved too
    if (!match.matchWinner) {
      savedRef.current = false;
    }
  }, [match.matchWinner]);

  // Ask before leaving a match that has started but isn't finished.
  // usePreventRemove catches every way of leaving: the Back button,
  // the Android back button/gesture, and the iOS swipe.
  const navigation = useNavigation();
  const [pendingLeave, setPendingLeave] = useState<NavigationAction | null>(
    null,
  );
  const matchInProgress = match.history.length > 0 && !match.matchWinner;

  usePreventRemove(matchInProgress, ({ data }) => {
    // remember how the user tried to leave, then show the confirmation modal
    setPendingLeave(data.action);
  });

  const confirmLeave = () => {
    const action = pendingLeave;
    setPendingLeave(null);
    if (action) navigation.dispatch(action); // carry on with the original back action
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
          onPress={undo}
          style={[styles.headerButton, { justifyContent: "flex-end" }]} // Overrides the default space-between to align this button to the right
        >
          <Ionicons name="arrow-undo-outline" size={24} color="#000" />
        </Pressable>
      </View>

      <MatchCard match={match} history={false} />
      <ScoreDisplay match={match} onPress={scorePoint}></ScoreDisplay>
      <Modal
        visible={match.matchWinner !== null}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.winnerText}>🏆 Match Over! 🏆</Text>

            <Text style={styles.teamNameText}>
              Winner: {match.matchWinner?.name}
            </Text>

            <View style={styles.modalButtonCont}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.back()}
              >
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={resetMatch}>
                <Text style={styles.buttonText}>Rematch</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Confirmation when leaving an unfinished match */}
      <Modal
        visible={pendingLeave !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPendingLeave(null)} // Android back = Stay
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.winnerText}>Leave match?</Text>
            <Text style={styles.leaveMessage}>
              This match isn't finished. If you leave now, it won't be saved.
            </Text>

            <View style={styles.modalButtonCont}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setPendingLeave(null)}
              >
                <Text style={styles.buttonText}>Stay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.leaveButton]}
                onPress={confirmLeave}
              >
                <Text style={styles.buttonText}>Leave</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingBottom: 60, // space where the FINISH button used to be
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dim background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  winnerText: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  teamNameText: { fontSize: 18, color: "#333", marginBottom: 20 },
  leaveMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  leaveButton: {
    backgroundColor: "#ff4444",
  },

  modalButtonCont: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#34C759",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
    minHeight: 50,
    padding: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
