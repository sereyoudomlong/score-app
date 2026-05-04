import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* This ensures your status bar (clock/battery) stays white on a dark app */}
      <StatusBar style="light" />

      {/* This is the master navigator */}
      <Stack>
        {/* 'screenOptions' here applies to every single page in your app */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
