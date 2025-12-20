import {
  users,
  watchlistEntries,
  type User,
  type UpsertUser,
  type WatchlistEntry,
  type InsertWatchlistEntry,
  type UpdateWatchlistEntry,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getAllWatchlistEntries(): Promise<WatchlistEntry[]>;
  getWatchlistEntry(id: string): Promise<WatchlistEntry | undefined>;
  createWatchlistEntry(entry: InsertWatchlistEntry): Promise<WatchlistEntry>;
  updateWatchlistEntry(id: string, updates: UpdateWatchlistEntry): Promise<WatchlistEntry | undefined>;
  deleteWatchlistEntry(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllWatchlistEntries(): Promise<WatchlistEntry[]> {
    return await db.select().from(watchlistEntries);
  }

  async getWatchlistEntry(id: string): Promise<WatchlistEntry | undefined> {
    const [entry] = await db.select().from(watchlistEntries).where(eq(watchlistEntries.id, id));
    return entry;
  }

  async createWatchlistEntry(entry: InsertWatchlistEntry): Promise<WatchlistEntry> {
    const [created] = await db
      .insert(watchlistEntries)
      .values(entry)
      .returning();
    return created;
  }

  async updateWatchlistEntry(id: string, updates: UpdateWatchlistEntry): Promise<WatchlistEntry | undefined> {
    const [updated] = await db
      .update(watchlistEntries)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(watchlistEntries.id, id))
      .returning();
    return updated;
  }

  async deleteWatchlistEntry(id: string): Promise<void> {
    await db.delete(watchlistEntries).where(eq(watchlistEntries.id, id));
  }
}

export const storage = new DatabaseStorage();
