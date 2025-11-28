# InDecision

Aplicativo mobile (Expo/React Native) que sugere lugares de acordo com “vibes” pré-definidas, permitindo favoritar, filtrar e usar os dados mesmo offline.

## Visão geral
- Problema: dificuldade em escolher onde ir (cafés, bares, restaurantes).
- Solução: lista curada por “vibe” (categorias), com destaques filtráveis e favoritos persistentes.
- Plataforma: Expo Router + React Native, cache SQLite para uso offline.

## Tecnologias
- React Native 0.81 + Expo Router 6
- Expo SQLite (cache offline)
- AsyncStorage (favoritos)
- TypeScript

## Como rodar
1) Pré-requisitos: Node 18+, npm, Expo Go no dispositivo ou emulador Android/iOS configurado.  
2) Instalar deps: `npm install`  
3) Iniciar: `npm start`  
4) Abrir:  
   - Emulador/Android: `npm run android`  
   - Emulador/iOS (macOS): `npm run ios`  
   - Browser: `npm run web` (modo web)  

## Uso rápido
- Login: tela inicial em `app/index.tsx` (mock) → botão “Acessar” abre as abas.
- Home (Vibes): `app/(tabs)/index.tsx` lista categorias e destaques; filtro por vibe e busca por texto.
- Favoritos: `app/(tabs)/favoritos.tsx` mostra itens marcados; toggle de favorito em cada card.
- Detalhes: `app/details/[id].tsx` com informações do destaque.

## Dados e APIs
- Endpoints atuais (JSONBlob):  
  - Categorias: `https://jsonblob.com/api/jsonBlob/019a84e3-8840-7450-87b4-c3f60829d242`  
  - Destaques: `https://jsonblob.com/api/jsonBlob/019a84e2-3d16-71fc-8efa-39c605598bf3`  
- Caso a API esteja indisponível (ex.: 404), o app usa automaticamente os dados locais de `src/data/mock.ts` e cacheia em SQLite.

## Offline / Persistência
- SQLite: cache de categorias e destaques (`src/storage/database.ts`) para leitura offline.
- AsyncStorage: favoritos persistidos mesmo após fechar o app.

## Estrutura principal
- `app/` rotas Expo Router (login, abas, detalhes)
- `src/context/` contextos de Places (dados remotos/cache) e Favorites
- `src/services/placesApi.ts` fetch + fallback local
- `src/components/` UI (cards, categorias, busca)
- `src/data/mock.ts` dados locais de fallback
- `src/storage/database.ts` schema + cache SQLite
- `src/types/` tipos compartilhados

## Screenshots/Visuals
- Adicione capturas do app rodando (home, detalhes, favoritos). Exemplos de comandos: `expo start --web` e usar a ferramenta de screenshot do SO.

## Publicação
- Torne o repositório público no GitHub quando finalizar (Settings > Manage Access > Change visibility).

## Troubleshooting
- Endpoints 404: atualizar URLs dos blobs ou manter fallback local.
- Metro bundler travado: `rm -rf .expo && rm -rf node_modules && npm install`.
- Problemas com SQLite em emulador iOS: abrir app nativo ao menos uma vez após `pod install` (se ejetar).
