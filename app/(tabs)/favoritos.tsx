// app/(tabs)/favoritos.tsx
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import HighlightCard from "../../src/components/HighlightCard";
import { useFavorites } from "../../src/context/FavoritesContext";
import { usePlaces } from "../../src/context/PlacesContext";
import theme from "../../src/theme";

export default function FavoritosScreen() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { categories, highlights, loading, error } = usePlaces();

  const vibeLabels = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => map.set(category.id, category.title));
    return map;
  }, [categories]);

  const describeVibes = (vibes?: string[]) => {
    if (!vibes || vibes.length === 0) return undefined;
    return vibes
      .map((id) => vibeLabels.get(id) ?? id)
      .filter(Boolean)
      .slice(0, 3)
      .join(" • ");
  };

  const items = highlights.filter((highlight) => favorites.includes(highlight.id));

  if (loading && items.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.colors.primary} />
        <Text style={styles.centerText}>Carregando favoritos...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>Nenhum favorito ainda</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HighlightCard
            id={item.id}
            title={item.title}
            subtitle={item.subtitle ?? describeVibes(item.vibes)}
            meta={item.address}
            imageUri={item.imageUri}
            onPress={() => router.push(`/details/${item.id}`)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            isFavorite={isFavorite(item.id)}
            testID={`fav-${item.id}`}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
  },
  centerText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    marginTop: theme.spacing.sm,
  },
  errorText: {
    color: theme.colors.danger,
    padding: theme.spacing.md,
  },
});
