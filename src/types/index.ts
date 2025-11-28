// src/types/index.ts
export type Category = {
  id: string;
  title: string;
};

export type Highlight = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUri?: string | number;
  category?: string;
  address?: string;
  vibes?: string[];
};
