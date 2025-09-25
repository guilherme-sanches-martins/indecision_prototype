// app/index.tsx
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { router } from "expo-router"; // ← navegação
import theme from "../src/theme"; // ← tema centralizado

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);

  const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
  const isFormValid = isValidEmail(email) && password.trim().length >= 3;

  const handleAccess = () => {
    if (!isFormValid) {
      setError("Verifique e-mail e senha.");
      return;
    }
    setError(null);
    Keyboard.dismiss();
    console.log({ email, password });

    // navega para o grupo de abas (substitui a tela de login)
    router.replace("(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <StatusBar style="light" />

        <Text style={styles.logo}>InDecision</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={theme.colors.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={theme.colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          returnKeyType="go"
          onSubmitEditing={handleAccess}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          activeOpacity={0.8}
          disabled={!isFormValid}
          onPress={handleAccess}
          accessibilityRole="button"
          accessibilityState={{ disabled: !isFormValid }}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.divider} />
          <Text style={styles.footerText}>
            Não tem uma conta? Crie uma agora mesmo.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Paleta base usando theme
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },

  // Logo
  logo: {
    position: "absolute",
    top: theme.spacing.xl,
    fontSize: theme.typography.h2,
    fontWeight: theme.typography.strong,
    letterSpacing: 1,
    color: theme.colors.primary,
    textTransform: "uppercase",
  },

  // Campos
  input: {
    width: "100%",
    height: theme.sizes.inputHeight,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.inputBackground,
    paddingHorizontal: 18,
    marginTop: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },

  // Erro
  errorText: {
    width: "100%",
    marginTop: theme.spacing.sm,
    marginBottom: 4,
    fontSize: theme.typography.small,
    color: theme.colors.danger,
  },

  // Botão
  button: {
    width: "100%",
    height: theme.sizes.buttonHeight,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#111",
    fontSize: theme.typography.button,
    fontWeight: theme.typography.strong,
  },

  // Rodapé
  footer: {
    position: "absolute",
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.inputBackground,
    marginBottom: theme.spacing.sm,
  },
  footerText: {
    color: theme.colors.muted,
    fontSize: theme.typography.small,
    textAlign: "center",
  },
});
