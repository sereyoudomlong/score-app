import MatchCard from "@/components/MatchCard";
import { MatchData } from "@/constants/types";
import { CompletedMatchSchema } from "@/db/schema";
import { useMatchDB } from "@/hooks/useMatchDB";
import { router } from "expo-router";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Landing page for the app. Contains:
 * - Card with match summary (players, scores, date)
 *      + Card have different color based on match continuity
 * - Button start Match (navigate to scoreboard)
 * - Edit match history (navigate to match history screen)
 */

export default function Homepage() {
  // get the data from match db using the custom hook
  const { completedMatches } = useMatchDB();

  // destructure it to use for displaying
  const matchDataList = completedMatches.map((item) => {
    const match = item as CompletedMatchSchema;
    return {
      id: match._id,
      date: new Date(JSON.parse(match.matchDataJson).date).toLocaleDateString(
        "en-AU",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      ),
      time: new Date(JSON.parse(match.matchDataJson).date).toLocaleTimeString(
        "en-AU",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        },
      ),
      matchData: JSON.parse(match.matchDataJson) as MatchData,
    };
  });

  // 1. Group matches by date key (e.g., "6 Aug 2026")
  const groupedMatches = matchDataList.reduce(
    (acc, match) => {
      const dateKey = match.date;

      console.log(match.date);

      // If the date key doesn't exist yet, initialize an empty array
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      // Push the match under its date key
      acc[dateKey].push(match);
      return acc;
    },
    {} as Record<string, typeof matchDataList>,
  );

  // Format grouped object into SectionList structure
  const sections = Object.entries(groupedMatches).map(([dateKey, matches]) => ({
    title: dateKey,
    key: dateKey,
    data: matches,
  }));

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={sections}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) =>
          item.id ? `${item.id.toString()}-${index}` : index.toString()
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <MatchCard match={item.matchData} history={true} />
        )}
      />
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
    width: "100%",
  },

  sectionHeaderContainer: {
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingLeft: 10,
    width: "100%",
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280", // Muted gray
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  list: {
    flex: 1,
    width: "100%",
    marginBottom: 50,
  },

  listContent: {
    width: "100%",
    gap: 10,
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#28A745",
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
