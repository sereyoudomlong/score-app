import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* This ensures your status bar (clock/battery) stays white on a dark app */}
      <StatusBar style="dark" />

      {/* This is the master navigator */}
      <Stack>
        <Stack.Screen name="index" options={{ title: "Match History" }} />
        <Stack.Screen
          name="scorepage"
          options={{ title: "Scoreboard", headerBackTitle: "Back" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
