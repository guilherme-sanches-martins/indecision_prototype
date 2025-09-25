// app/_layout.tsx
import { Stack } from "expo-router";
import { FavoritesProvider } from "../src/context/FavoritesContext"; // ★ caminho relativo

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FavoritesProvider>
  );
}
