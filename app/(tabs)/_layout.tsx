import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff3b2f",
        tabBarInactiveTintColor: "#9a9a9a",
        tabBarStyle: { backgroundColor: "#0B0B0B", borderTopColor: "#222" },
      }}
    >
      {/* Home → aponta para app/(tabs)/index.tsx */}
      <Tabs.Screen
        name="index" // ★ precisa existir app/(tabs)/index.tsx
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Favoritos → aponta para app/(tabs)/favoritos.tsx */}
      <Tabs.Screen
        name="favoritos" // ★ minúsculo e com o arquivo correspondente
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      {/* Sorteio → aponta para app/(tabs)/sorteio.tsx */}
      <Tabs.Screen
        name="sorteio" // ★ precisa do arquivo correspondente
        options={{
          title: "Sorteio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
