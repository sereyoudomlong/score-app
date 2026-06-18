import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* This ensures your status bar (clock/battery) stays white on a dark app */}
      <StatusBar style="dark" />

      {/* This is the master navigator */}
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Match History", headerBackVisible: false }}
        />
        <Stack.Screen
          name="scorepage"
          options={{ headerShown: false }} // Hides the default header for a cleaner look on the score page
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
