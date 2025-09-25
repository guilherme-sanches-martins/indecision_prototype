// src/data/mock.ts
export type Category = {
  id: string;
  title: string;
};

export type Highlight = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUri?: string | number; // ★ aceita string (URL) ou number (require(...))
};

export const categories: Category[] = [
  { id: "balada", title: "Balada" },
  { id: "restaurante", title: "Restaurante" },
  { id: "cafe", title: "Cafézinho" },
  { id: "ponto", title: "Ponto turístico" },
];

export const highlights: Highlight[] = [
  {
    id: "malcom",
    title: "Malcom Pub",
    subtitle: "Bar e música ao vivo",
    description:
      "Malcom Pub é conhecido por música ao vivo todas as sextas e um cardápio variado de drinks. Horário: 18h–02h. Endereço: Rua Exemplo, 123.",
    imageUri:
      "https://www.olharconceito.com.br/imgsite/noticias/Malcom-Pub-(3)-Divulgacao.jpg",
  },
  {
    id: "boteco",
    title: "Boteco X",
    subtitle: "Chopp gelado",
    description:
      "Boteco X é um clássico da cidade, com petiscos tradicionais e chopp sempre gelado. Horário: 12h–00h.",
    imageUri:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "cafecentral",
    title: "Café Central",
    subtitle: "Cafés especiais",
    description:
      "Café Central serve grãos selecionados, ambiente tranquilo e opções de brunch. Aberto das 8h às 20h.",
    imageUri:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80&auto=format&fit=crop",
  },
];
