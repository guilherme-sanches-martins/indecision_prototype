// src/components/CategoryItem.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import theme from "../theme";

type Props = {
  title: string;
  onPress?: () => void;
  testID?: string;
};

export default function CategoryItem({ title, onPress, testID }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
      accessibilityRole="button"
      testID={testID}
    >
      <View style={styles.icon}>
        <Text style={styles.iconText}>{title.charAt(0)}</Text>
      </View>

      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: theme.typography.strong as any,
  },
  label: {
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: theme.typography.small,
    textAlign: "center",
  },
});
