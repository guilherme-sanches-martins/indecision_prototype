// app/details/[id].tsx
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePlaces } from "../../src/context/PlacesContext";
import theme from "../../src/theme";

const toImageSource = (value?: string | number): ImageSourcePropType | undefined => {
  if (!value) return undefined;
  return typeof value === "number" ? value : ({ uri: value } as ImageSourcePropType);
};

export default function DetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { categories, highlights, loading, error } = usePlaces();

  const vibeLabels = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => map.set(category.id, category.title));
    return map;
  }, [categories]);

  const id = params?.id ?? "";
  const item = highlights.find((highlight) => highlight.id === id);

  if (loading && !item) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.colors.primary} />
        <Text style={styles.centerText}>Buscando detalhes...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>Lugar não encontrado</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageSource = toImageSource(item.imageUri);
  const vibeList = (item.vibes ?? []).map((id) => vibeLabels.get(id) ?? id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>{item.title.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
        {item.address ? <Text style={styles.address}>{item.address}</Text> : null}
        {vibeList.length ? (
          <View style={styles.chipRow}>
            {vibeList.map((label) => (
              <View key={label} style={styles.chip}>
                <Text style={styles.chipText}>{label}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {item.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.sectionText}>{item.description}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
          <Text style={styles.actionText}>Abrir no mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingBottom: theme.spacing.lg,
  },
  headerRow: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  backTouch: {
    padding: 8,
    alignSelf: "flex-start",
  },
  backText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.strong as any,
  },
  imageWrap: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: theme.radii.card,
    backgroundColor: theme.colors.inputBackground,
  },
  imagePlaceholder: {
    width: 160,
    height: 160,
    borderRadius: theme.radii.card,
    backgroundColor: theme.colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    color: theme.colors.text,
    fontSize: 56,
    fontWeight: theme.typography.strong as any,
  },
  body: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.h1,
    fontWeight: theme.typography.strong as any,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    marginBottom: theme.spacing.xs,
  },
  address: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    marginBottom: theme.spacing.sm,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.md,
    marginHorizontal: -4,
  },
  chip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  chipText: {
    color: theme.colors.muted,
    fontSize: theme.typography.small,
  },
  section: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: theme.typography.strong as any,
    marginBottom: theme.spacing.sm,
  },
  sectionText: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    lineHeight: 20,
  },
  actionBtn: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radii.md,
    alignItems: "center",
  },
  actionText: {
    color: "#111",
    fontWeight: theme.typography.strong as any,
    fontSize: theme.typography.button,
  },
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
  },
  centerText: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },
  errorText: {
    color: theme.colors.danger,
    marginTop: theme.spacing.sm,
  },
  backButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.radii.md,
  },
});
