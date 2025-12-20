import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, index, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const watchlistEntries = pgTable("watchlist_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // "movie" or "series"
  posterUrl: text("poster_url"),
  runtime: text("runtime"),
  genre: text("genre"),
  imdbId: varchar("imdb_id", { length: 20 }),
  plot: text("plot"),
  streamingService: text("streaming_service"),
  addedById: varchar("added_by_id").notNull().references(() => users.id),
  userAPriority: varchar("user_a_priority", { length: 10 }), // "high", "medium", "low"
  userBPriority: varchar("user_b_priority", { length: 10 }),
  userAProgress: text("user_a_progress"), // e.g., "Unwatched", "S3 E5", "Watched"
  userBProgress: text("user_b_progress"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertWatchlistEntrySchema = createInsertSchema(watchlistEntries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateWatchlistEntrySchema = insertWatchlistEntrySchema.partial();

export type InsertWatchlistEntry = z.infer<typeof insertWatchlistEntrySchema>;
export type UpdateWatchlistEntry = z.infer<typeof updateWatchlistEntrySchema>;
export type WatchlistEntry = typeof watchlistEntries.$inferSelect;
