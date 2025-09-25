// app/details/[id].tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { highlights } from "../../src/data/mock";
import theme from "../../src/theme";

// ★ helper: aceita string (URL) ou number (require)
const toImageSource = (v?: string | number): ImageSourcePropType | undefined => {
  if (!v) return undefined;
  return typeof v === "number" ? v : ({ uri: v } as ImageSourcePropType);
};

export default function DetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const id = params?.id ?? "";
  const item = highlights.find((h) => h.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Item não encontrado</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageSource = toImageSource(item.imageUri); // ★ normaliza aqui

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="light-content" />

      {/* topo: botão voltar */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* imagem (remota ou local) */}
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>{item.title.charAt(0)}</Text>
          </View>
        )}
      </View>

      {/* corpo */}
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}

        {item.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.sectionText}>{item.description}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.actionBtn} onPress={() => { /* futuramente: abrir mapa */ }}>
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

  // imagem grande
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
    marginBottom: theme.spacing.md,
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
  notFoundText: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    marginBottom: theme.spacing.md,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.radii.md,
  },
});
