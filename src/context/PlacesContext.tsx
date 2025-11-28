// src/context/PlacesContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { categories as fallbackCategories, highlights as fallbackHighlights } from "../data/mock";
import { fetchRemoteCategories, fetchRemoteHighlights } from "../services/placesApi";
import { cacheCategories, cacheHighlights, getCachedCategories, getCachedHighlights, initDatabase } from "../storage/database";
import { Category, Highlight } from "../types";

type PlacesContextValue = {
  categories: Category[];
  highlights: Highlight[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const PlacesContext = createContext<PlacesContextValue | undefined>(undefined);

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncFromApi = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;
      if (!silent) {
        setLoading(true);
      }

      try {
        const [remoteCategories, remoteHighlights] = await Promise.all([
          fetchRemoteCategories(),
          fetchRemoteHighlights(),
        ]);

        setCategories(remoteCategories.data);
        setHighlights(remoteHighlights.data);

        await cacheCategories(remoteCategories.data);
        await cacheHighlights(remoteHighlights.data);

        const usedFallback = remoteCategories.fromFallback || remoteHighlights.fromFallback;
        setError(
          usedFallback ? "Nao foi possivel atualizar agora. Usando dados locais." : null
        );
      } catch (err) {
        console.warn("Erro ao buscar dados remotos", err);
        setError("Nao foi possivel atualizar agora. Mostrando dados salvos.");
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        await initDatabase();

        const [cachedCategories, cachedHighlights] = await Promise.all([
          getCachedCategories(),
          getCachedHighlights(),
        ]);

        setCategories(
          cachedCategories.length ? cachedCategories : fallbackCategories
        );
        setHighlights(
          cachedHighlights.length ? cachedHighlights : fallbackHighlights
        );
      } catch (err) {
        console.warn("Erro ao carregar cache local", err);
        setCategories(fallbackCategories);
        setHighlights(fallbackHighlights);
        setError("Iniciando com dados locais.");
      } finally {
        setLoading(false);
        syncFromApi({ silent: true });
      }
    })();
  }, [syncFromApi]);

  const refresh = useCallback(() => syncFromApi(), [syncFromApi]);

  const value = useMemo(
    () => ({
      categories,
      highlights,
      loading,
      error,
      refresh,
    }),
    [categories, highlights, loading, error, refresh]
  );

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
}

export function usePlaces() {
  const ctx = useContext(PlacesContext);
  if (!ctx) {
    throw new Error("usePlaces must be used within PlacesProvider");
  }
  return ctx;
}

