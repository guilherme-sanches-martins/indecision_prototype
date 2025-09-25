// app/(tabs)/index.tsx
import React, { useState } from "react"; // ★ useState adicionado
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

import SearchBar from "../../src/components/SearchBar"; // ★ import do SearchBar
import CategoryItem from "../../src/components/CategoryItem"; // ★ import do CategoryItem
import HighlightCard from "../../src/components/HighlightCard"; // ★ import do HighlightCard
import { categories, highlights } from "../../src/data/mock"; // ★ import dos dados mock
import { router } from "expo-router"; 
import { useFavorites } from "../../src/context/FavoritesContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [search, setSearch] = useState(""); // ★ estado da search

  const { isFavorite, toggleFavorite } = useFavorites();


  // ★ filtro simples usando o estado da SearchBar
  const filteredHighlights = highlights.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase())
  );

  // ★ render usando o componente CategoryItem
  const renderCategory = ({ item }: { item: typeof categories[number] }) => (
    <CategoryItem
      title={item.title}
      onPress={() => {
        console.log("Categoria:", item.id); // ainda stub
        // Ex: router.push(`/categoria/${item.id}`)
      }}
      testID={`cat-${item.id}`}
    />
  );

  // ★ render usando o componente HighlightCard
  const renderCard = ({ item }: { item: typeof highlights[number] }) => (
    <HighlightCard
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => 
        router.push(`/details/${item.id}`)}
        onToggleFavorite={() => toggleFavorite(item.id)}
        isFavorite={isFavorite(item.id)}
        testID={`hl-${item.id}`}    
    />
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Top logo / título (mantive como texto por enquanto) */}
      <View style={styles.topRow}>
        <Text style={styles.logoText}>InDecision</Text>
      </View>

      {/* Headline principal (texto do Figma) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Qual sua vibe pra hoje?</Text>
        <Text style={styles.headerSubtitle}>Descubra sua vibe</Text>
      </View>

      {/* ★ SearchBar reutilizável */}
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Categorias horizontais (Balada, Restaurante, etc.) */}
      <View style={styles.sectionSmall}>
        <FlatList
          data={categories}
          renderItem={renderCategory} // ★ agora usa CategoryItem
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 12 }}
        />
      </View>

      {/* Seção "Bombando nesta semana" */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bombando nesta semana</Text>
        <Text style={styles.sectionAction}>Ver tudo</Text>
      </View>

      <View style={styles.horizontalListWrap}>
        <FlatList
          data={filteredHighlights} // ★ usa dados filtrados pela SearchBar
          renderItem={renderCard} // ★ agora usa HighlightCard
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        />
      </View>

      {/* Espaço extra no final */}
      <View style={{ height: 24 }} />
    </View>
  );
}

/* ===== Estilos (tema InDecision: fundo escuro + laranja) */
const CARD_W = Math.round(width * 0.64);

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

  searchWrapper: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#141414",
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 15,
  },

  sectionSmall: {
    marginBottom: 8,
  },

  catItem: {
    width: 84,
    alignItems: "center",
    marginRight: 12,
  },
  catIconPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
  },
  catIconText: {
    color: "#f2f2f2",
    fontSize: 20,
    fontWeight: "800",
  },
  catLabel: {
    marginTop: 8,
    color: "#f2f2f2",
    fontSize: 13,
    textAlign: "center",
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
    height: 160,
  },

  card: {
    width: CARD_W,
    marginRight: 12,
    borderRadius: 14,
    backgroundColor: "#121212",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  cardImagePlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 12,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardImageText: {
    color: "#f2f2f2",
    fontSize: 24,
    fontWeight: "800",
  },

  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: "#f2f2f2",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#9a9a9a",
    fontSize: 13,
  },
});
