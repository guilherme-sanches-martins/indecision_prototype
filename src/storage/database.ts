// src/storage/database.ts
import { openDatabaseSync } from "expo-sqlite";
import { Category, Highlight } from "../types";

const DATABASE_NAME = "indecision.db";
const db = openDatabaseSync(DATABASE_NAME);

type Statement = {
  sql: string;
  args?: (string | number | null)[];
};

const runBatch = async (statements: Statement[]) => {
  await db.withTransactionAsync(async () => {
    for (const { sql, args } of statements) {
      await db.runAsync(sql, args ?? []);
    }
  });
};

const queryRows = <T>(sql: string, args: (string | number | null)[] = []) => {
  return db.getAllAsync<T>(sql, args);
};

const ensureColumn = async (table: string, column: string, definition: string) => {
  const info = await db.getAllAsync<{ name: string }>(`PRAGMA table_info(${table})`);
  const exists = info.some((item) => item.name === column);
  if (!exists) {
    await db.execAsync(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
};

export async function initDatabase() {
  await runBatch([
    {
      sql: `CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL
      )`,
    },
    {
      sql: `CREATE TABLE IF NOT EXISTS highlights (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        description TEXT,
        imageUri TEXT,
        category TEXT,
        address TEXT,
        vibes TEXT
      )`,
    },
  ]);

  await ensureColumn("highlights", "subtitle", "TEXT");
  await ensureColumn("highlights", "description", "TEXT");
  await ensureColumn("highlights", "imageUri", "TEXT");
  await ensureColumn("highlights", "category", "TEXT");
  await ensureColumn("highlights", "address", "TEXT");
  await ensureColumn("highlights", "vibes", "TEXT");
}

export async function cacheCategories(categories: Category[]) {
  await runBatch([
    { sql: "DELETE FROM categories" },
    ...categories.map((category) => ({
      sql: "INSERT OR REPLACE INTO categories (id, title) VALUES (?, ?)",
      args: [category.id, category.title],
    })),
  ]);
}

export async function cacheHighlights(highlights: Highlight[]) {
  await runBatch([
    { sql: "DELETE FROM highlights" },
    ...highlights.map((highlight) => ({
      sql: `INSERT OR REPLACE INTO highlights
            (id, title, subtitle, description, imageUri, category, address, vibes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        highlight.id,
        highlight.title,
        highlight.subtitle ?? null,
        highlight.description ?? null,
        typeof highlight.imageUri === "string" ? highlight.imageUri : null,
        highlight.category ?? null,
        highlight.address ?? null,
        highlight.vibes ? JSON.stringify(highlight.vibes) : null,
      ],
    })),
  ]);
}

export function getCachedCategories() {
  return queryRows<Category>("SELECT id, title FROM categories ORDER BY title ASC");
}

export function getCachedHighlights() {
  return queryRows<{
    id: string;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    imageUri?: string | null;
    category?: string | null;
    address?: string | null;
    vibes?: string | null;
  }>(
    "SELECT id, title, subtitle, description, imageUri, category, address, vibes FROM highlights ORDER BY title ASC"
  ).then((rows) =>
    rows.map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle ?? undefined,
      description: row.description ?? undefined,
      imageUri: row.imageUri ?? undefined,
      category: row.category ?? undefined,
      address: row.address ?? undefined,
      vibes: row.vibes ? JSON.parse(row.vibes) : undefined,
    }))
  );
}
