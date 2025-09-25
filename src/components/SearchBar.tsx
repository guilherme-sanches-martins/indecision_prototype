// src/components/SearchBar.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import theme from "../theme";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  testID?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Pesquisar",
  testID,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        accessible
        accessibilityLabel="Campo de busca"
        testID={testID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  input: {
    height: theme.sizes.inputHeight,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: 14,
    color: theme.colors.text,
    fontSize: theme.typography.body,
  },
});
