// src/components/HighlightCard.tsx
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  imageUri?: string | number; // ★ aceita string (URL) ou number (require)
  onPress?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  testID?: string;
};

const { width } = Dimensions.get("window");
const CARD_W = Math.round(width * theme.sizes.cardWidthRatio);

// ★ helper: normaliza string -> { uri: string } e mantém number (require)
const toImageSource = (v?: string | number): ImageSourcePropType | undefined => {
  if (!v) return undefined;
  return typeof v === "number" ? v : ({ uri: v } as ImageSourcePropType);
};

export default function HighlightCard({
  id,
  title,
  subtitle,
  imageUri,
  onPress,
  onToggleFavorite,
  isFavorite = false,
  testID,
}: Props) {
  const src = toImageSource(imageUri); // ★ normaliza antes de passar ao <Image>

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      testID={testID}
    >
      {src ? (
        <Image source={src} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>{title.charAt(0)}</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onToggleFavorite && onToggleFavorite();
        }}
        style={styles.favoriteBtn}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={20}
          color={isFavorite ? theme.colors.primary : theme.colors.text}
        />
      </Pressable>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_W,
    marginRight: theme.spacing.md,
    borderRadius: theme.radii.card,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: theme.radii.md,
    marginRight: theme.spacing.md,
  },
  imagePlaceholder: {
    width: 68,
    height: 68,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  imagePlaceholderText: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: theme.typography.strong as any,
  },
  body: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: theme.typography.strong as any,
    marginBottom: 6,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.small,
  },
  favoriteBtn: {
    marginLeft: theme.spacing.sm,
    padding: 6,
    borderRadius: theme.radii.sm,
  },
});
