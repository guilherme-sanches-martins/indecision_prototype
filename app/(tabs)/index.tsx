// app/(tabs)/index.tsx
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import SearchBar from "../../src/components/SearchBar";
import CategoryItem from "../../src/components/CategoryItem";
import HighlightCard from "../../src/components/HighlightCard";
import { useFavorites } from "../../src/context/FavoritesContext";
import { usePlaces } from "../../src/context/PlacesContext";
import type { Category, Highlight } from "../../src/types";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const { categories, highlights, loading, error, refresh } = usePlaces();
  const { isFavorite, toggleFavorite } = useFavorites();

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

  const filteredHighlights = useMemo(() => {
    const term = search.trim().toLowerCase();
    return highlights.filter((highlight) => {
      const matchesSearch =
        term.length === 0 ||
        highlight.title.toLowerCase().includes(term) ||
        (highlight.subtitle ?? "").toLowerCase().includes(term) ||
        (highlight.vibes ?? []).some((vibe) =>
          (vibeLabels.get(vibe) ?? vibe).toLowerCase().includes(term)
        );
      const matchesVibe =
        !selectedVibe || (highlight.vibes ?? []).includes(selectedVibe);
      return matchesSearch && matchesVibe;
    });
  }, [highlights, search, selectedVibe, vibeLabels]);

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryItem
      title={item.title}
      iconId={item.id}
      active={selectedVibe === item.id}
      onPress={() =>
        setSelectedVibe((current) => (current === item.id ? null : item.id))
      }
      testID={`cat-${item.id}`}
    />
  );

  const renderCard = ({ item }: { item: Highlight }) => (
    <HighlightCard
      id={item.id}
      title={item.title}
      subtitle={item.subtitle ?? describeVibes(item.vibes)}
      meta={item.address}
      imageUri={item.imageUri}
      onPress={() => router.push(`/details/${item.id}`)}
      onToggleFavorite={() => toggleFavorite(item.id)}
      isFavorite={isFavorite(item.id)}
      testID={`hl-${item.id}`}
    />
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topRow}>
        <Text style={styles.logoText}>InDecision</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Qual sua vibe pra hoje?</Text>
        <Text style={styles.headerSubtitle}>Descubra sua vibe</Text>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.sectionSmall}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 12 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Sem vibes disponíveis</Text>
            </View>
          }
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bombando nesta semana</Text>
        <TouchableOpacity
          onPress={refresh}
          disabled={loading}
          accessibilityRole="button"
        >
          <Text style={[styles.sectionAction, loading && { opacity: 0.5 }]}>
            {loading ? "Atualizando..." : "Atualizar"}
          </Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      <View style={styles.horizontalListWrap}>
        {loading && filteredHighlights.length === 0 ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#ff3b2f" />
            <Text style={styles.loadingText}>Carregando sugestões...</Text>
          </View>
        ) : filteredHighlights.length > 0 ? (
          <FlatList
            data={filteredHighlights}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma sugestão encontrada.</Text>
          </View>
        )}
      </View>

      <View style={{ height: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    paddingTop: 18,
  },
  topRow: {
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  logoText: {
    color: "#ff3b2f",
    fontSize: 20,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  headerTitle: {
    color: "#f2f2f2",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#9aa0a6",
    fontSize: 14,
    marginTop: 6,
  },
  sectionSmall: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#f2f2f2",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionAction: {
    color: "#9a9a9a",
    fontSize: 13,
  },
  horizontalListWrap: {
    minHeight: 160,
    justifyContent: "center",
  },
  loadingState: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingText: {
    color: "#f2f2f2",
    marginLeft: 12,
  },
  emptyState: {
    paddingHorizontal: 20,
  },
  emptyText: {
    color: "#9a9a9a",
  },
  errorMessage: {
    color: "#ff6b5f",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
});
