// src/services/placesApi.ts
import { categories as fallbackCategories, highlights as fallbackHighlights } from "../data/mock";
import { Category, Highlight } from "../types";

const VIBES_ENDPOINT = "https://jsonblob.com/api/jsonBlob/019a84e3-8840-7450-87b4-c3f60829d242";
const PLACES_ENDPOINT = "https://jsonblob.com/api/jsonBlob/019a84e2-3d16-71fc-8efa-39c605598bf3";

type RemoteVibe = {
  id: string;
  title: string;
};

type RemotePlace = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  address?: string;
  imageUri?: string;
  vibes?: string[];
};

type FetchResult<T> = {
  data: T;
  fromFallback: boolean;
};

const fetchJsonWithFallback = async <TRemote, TNormalized>(
  url: string,
  normalize: (data: TRemote) => TNormalized,
  fallback: TNormalized
): Promise<FetchResult<TNormalized>> => {
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Falha ao carregar dados (${response.status}): ${text}`);
    }
    const remoteData: TRemote = await response.json();
    return { data: normalize(remoteData), fromFallback: false };
  } catch (error) {
    console.info(`Fonte remota indisponivel (${url}), usando fallback local`, error);
    return { data: fallback, fromFallback: true };
  }
};

export async function fetchRemoteCategories(): Promise<FetchResult<Category[]>> {
  return fetchJsonWithFallback<RemoteVibe[], Category[]>(
    VIBES_ENDPOINT,
    (data) =>
      data.map((vibe) => ({
        id: vibe.id,
        title: vibe.title,
      })),
    fallbackCategories
  );
}

export async function fetchRemoteHighlights(): Promise<FetchResult<Highlight[]>> {
  return fetchJsonWithFallback<RemotePlace[], Highlight[]>(
    PLACES_ENDPOINT,
    (data) =>
      data.map((place) => ({
        id: place.id,
        title: place.title,
        subtitle: place.subtitle,
        description: place.description,
        address: place.address,
        imageUri: place.imageUri,
        vibes: place.vibes,
      })),
    fallbackHighlights
  );
}
