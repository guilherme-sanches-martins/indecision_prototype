// app/_layout.tsx
import { Stack } from "expo-router";
import { FavoritesProvider } from "../src/context/FavoritesContext";
import { PlacesProvider } from "../src/context/PlacesContext";

export default function RootLayout() {
  return (
    <PlacesProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </PlacesProvider>
  );
}
