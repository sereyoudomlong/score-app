import { Ionicons } from "@expo/vector-icons"; // Built into Expo
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#32CD32",
        headerStyle: { backgroundColor: "#266603" },
        headerTintColor: "#ffffff",
        tabBarStyle: { backgroundColor: "#266603" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Court",
          tabBarIcon: ({ color }) => (
            <Ionicons name="tennisball" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
