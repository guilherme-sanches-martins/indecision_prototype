// src/components/CategoryItem.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";

type Props = {
  title: string;
  iconId?: string;
  onPress?: () => void;
  active?: boolean;
  testID?: string;
};

const ICON_MAP: Record<string, { lib: "ionicons" | "mci"; name: string }> = {
  "cafe-manha": { lib: "ionicons", name: "sunny" },
  cafe: { lib: "ionicons", name: "cafe" },
  lanche: { lib: "ionicons", name: "fast-food" },
  relax: { lib: "ionicons", name: "bed" },
  cerveja: { lib: "ionicons", name: "beer" },
  noite: { lib: "ionicons", name: "moon" },
  musica: { lib: "ionicons", name: "musical-notes" },
  danca: { lib: "mci", name: "music-note-eighth" },
  vista: { lib: "ionicons", name: "eye" },
  coquetel: { lib: "ionicons", name: "wine" },
  gastronomia: { lib: "ionicons", name: "restaurant" },
  experiencia: { lib: "ionicons", name: "sparkles" },
  vinho: { lib: "ionicons", name: "wine" },
  casual: { lib: "ionicons", name: "people" },
  healthy: { lib: "ionicons", name: "leaf" },
  dia: { lib: "ionicons", name: "sunny" },
};

const renderIcon = (id?: string, color?: string) => {
  const match = id ? ICON_MAP[id] : undefined;
  if (!match) {
    return <Ionicons name="location-outline" size={20} color={color ?? theme.colors.text} />;
  }
  if (match.lib === "mci") {
    return (
      <MaterialCommunityIcons
        name={match.name as any}
        size={20}
        color={color ?? theme.colors.text}
      />
    );
  }
  return <Ionicons name={match.name as any} size={20} color={color ?? theme.colors.text} />;
};

export default function CategoryItem({ title, iconId, onPress, active = false, testID }: Props) {
  const iconColor = active ? "#111" : theme.colors.text;

  return (
    <TouchableOpacity
      style={[styles.container, active && styles.containerActive]}
      activeOpacity={0.8}
      onPress={onPress}
      accessibilityRole="button"
      testID={testID}
    >
      <View style={[styles.icon, active && styles.iconActive]}>
        {renderIcon(iconId, iconColor)}
      </View>

      <Text style={[styles.label, active && styles.labelActive]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  containerActive: {
    transform: [{ scale: 1.04 }],
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  iconActive: {
    backgroundColor: theme.colors.primary,
  },
  label: {
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: theme.typography.small,
    textAlign: "center",
  },
  labelActive: {
    color: theme.colors.primary,
  },
});
