// src/theme.ts
const theme = {
  colors: {
    background: "#0B0B0B",      // fundo geral
    surface: "#121212",         // cards / superfícies
    inputBackground: "#2b2b2b", // inputs
    primary: "#ff3b2f",         // laranja destaque (brand)
    accent: "#ff3b2f",          // alias para botões / highlights
    text: "#f2f2f2",            // texto principal
    muted: "#9a9a9a",           // texto secundário / legendas
    placeholder: "#9a9a9a",     // placeholder do input
    danger: "#ff6b5f",          // erros
  },
  spacing: {
    xs: 6,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 6,
    md: 12,
    pill: 999,
    card: 14,
  },
  typography: {
    h1: 28,
    h2: 22,
    h3: 18,
    body: 15,
    small: 12,
    button: 16,
    strong: "700" as const,
    regular: "400" as const,
  },
  sizes: {
    inputHeight: 52,
    buttonHeight: 56,
    cardWidthRatio: 0.64,
  },
};

export type Theme = typeof theme;
export default theme;
