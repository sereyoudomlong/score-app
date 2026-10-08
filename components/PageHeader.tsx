import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Shared header used at the top of the custom screens:
 * --------------------------------------
 * | < Back        Title          [right] |
 * --------------------------------------
 * The top spacing comes from the phone itself (safe area insets),
 * so it sits just below the status bar / notch on any device.
 */

interface PageHeaderProps {
  title: string;
  onBack?: () => void; // defaults to going back one screen
  right?: ReactNode; // optional button on the right (e.g. undo)
}

export default function PageHeader({ title, onBack, right }: PageHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.pageHeader}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={20} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>{title}</Text>

        {/* Same width as the Back button so the title stays centred,
            even when there's no right button */}
        <View style={[styles.headerButton, styles.rightSlot]}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#ffffff",
    marginBottom: 20,
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
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 80, // fixed width keeps the title centred
    paddingVertical: 8,
  },
  rightSlot: {
    justifyContent: "flex-end",
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
});
