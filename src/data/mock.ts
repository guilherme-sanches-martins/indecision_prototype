// src/data/mock.ts
import { Category, Highlight } from "../types";

export const categories: Category[] = [
  { id: "cafe-manha", title: "Café da manhã" },
  { id: "cafe", title: "Café" },
  { id: "lanche", title: "Lanche rápido" },
  { id: "relax", title: "Relax" },
  { id: "cerveja", title: "Cerveja" },
  { id: "noite", title: "Noite" },
  { id: "musica", title: "Música ao vivo" },
  { id: "danca", title: "Dança" },
  { id: "vista", title: "Vista panorâmica" },
  { id: "coquetel", title: "Coquetel" },
  { id: "gastronomia", title: "Gastronomia" },
  { id: "experiencia", title: "Experiência" },
  { id: "vinho", title: "Vinho" },
  { id: "casual", title: "Casual" },
  { id: "healthy", title: "Vida saudável" },
  { id: "dia", title: "Dia" },
];

export const highlights: Highlight[] = [
  {
    id: "cafe-aurora",
    title: "Café Aurora",
    subtitle: "Brunch autoral",
    description: "Spot iluminado com menu sazonal inspirado em ingredientes locais.",
    address: "Rua das Flores, 123",
    imageUri:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    vibes: ["cafe-manha", "cafe", "lanche", "relax"],
  },
  {
    id: "bar-do-ze",
    title: "Bar do Zé",
    subtitle: "Sertanejo ao vivo",
    description: "Clássico boteco de esquina com chope trincando e pista pequena.",
    address: "Av. Central, 900",
    imageUri:
      "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=800&q=80",
    vibes: ["cerveja", "noite", "musica", "danca"],
  },
  {
    id: "mirante-360",
    title: "Mirante 360",
    subtitle: "Rooftop bar",
    description: "Coquetéis autorais e vista da cidade inteira.",
    address: "Rua Horizonte, 800",
    imageUri:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    vibes: ["noite", "vista", "coquetel"],
  },
  {
    id: "botanico",
    title: "Botânico",
    subtitle: "Restaurante contemporâneo",
    description: "Menu degustação focado em ingredientes amazônicos.",
    address: "Rua Ipê Roxo, 55",
    imageUri:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
    vibes: ["gastronomia", "experiencia", "vinho", "relax"],
  },
  {
    id: "garagem-sessions",
    title: "Garagem Sessions",
    subtitle: "Pub indie",
    description: "Programação semanal de bandas independentes e foodtrucks.",
    address: "Rua das Artes, 77",
    imageUri:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
    vibes: ["musica", "noite", "cerveja", "casual"],
  },
  {
    id: "orla-fit",
    title: "Orla Fit",
    subtitle: "Smoothie + bowls",
    description: "Bar de sucos e bowls perfeitos pós-treino beira-rio.",
    address: "Av. da Praia, 45",
    imageUri:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",
    vibes: ["healthy", "dia", "lanche", "vista"],
  },
];
