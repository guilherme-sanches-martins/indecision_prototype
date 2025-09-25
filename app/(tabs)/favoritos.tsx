// app/(tabs)/favoritos.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFavorites } from "../../src/context/FavoritesContext";
import { highlights } from "../../src/data/mock";
import HighlightCard from "../../src/components/HighlightCard";
import { router } from "expo-router";
import theme from "../../src/theme";

export default function FavoritosScreen() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // pega os dados full dos highlights que estão favoritados
  const items = highlights.filter((h) => favorites.includes(h.id));

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <HighlightCard
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
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
  empty: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
  },
});
