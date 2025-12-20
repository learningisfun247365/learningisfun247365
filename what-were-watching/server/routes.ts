import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertWatchlistEntrySchema, updateWatchlistEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/search-movies', isAuthenticated, async (req, res) => {
    try {
      const query = req.query.query as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter required" });
      }

      const omdbApiKey = process.env.OMDB_API_KEY;
      if (!omdbApiKey) {
        return res.status(500).json({ message: "OMDb API key not configured" });
      }

      const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${encodeURIComponent(query)}`;
      console.log(`[OMDb] Searching for: "${query}"`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`[OMDb] Response:`, JSON.stringify(data, null, 2));

      if (data.Response === "False") {
        console.log(`[OMDb] No results found. Error: ${data.Error}`);
        return res.json([]);
      }

      const results = data.Search.map((item: any) => ({
        title: item.Title,
        year: item.Year,
        type: item.Type,
        poster: item.Poster,
        imdbID: item.imdbID,
      }));

      console.log(`[OMDb] Returning ${results.length} results`);
      res.json(results);
    } catch (error) {
      console.error("Error searching movies:", error);
      res.status(500).json({ message: "Failed to search movies" });
    }
  });

  app.get('/api/watchlist', isAuthenticated, async (req, res) => {
    try {
      const entries = await storage.getAllWatchlistEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      res.status(500).json({ message: "Failed to fetch watchlist" });
    }
  });

  app.post('/api/watchlist', isAuthenticated, async (req: any, res) => {
    try {
      const { imdbId, streamingService } = req.body;
      const userId = req.user.claims.sub;

      if (!imdbId) {
        return res.status(400).json({ message: "IMDb ID required" });
      }

      const omdbApiKey = process.env.OMDB_API_KEY;
      if (!omdbApiKey) {
        return res.status(500).json({ message: "OMDb API key not configured" });
      }

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbId}&plot=full`
      );

      const data = await response.json();

      if (data.Response === "False") {
        return res.status(404).json({ message: "Movie not found" });
      }

      const entry = await storage.createWatchlistEntry({
        title: data.Title,
        type: data.Type === "movie" ? "movie" : "series",
        posterUrl: data.Poster !== "N/A" ? data.Poster : null,
        runtime: data.Runtime !== "N/A" ? data.Runtime : null,
        genre: data.Genre !== "N/A" ? data.Genre : null,
        imdbId: data.imdbID,
        plot: data.Plot !== "N/A" ? data.Plot : null,
        streamingService: streamingService || null,
        addedById: userId,
        userAPriority: null,
        userBPriority: null,
        userAProgress: "Unwatched",
        userBProgress: "Unwatched",
      });

      res.json(entry);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      res.status(500).json({ message: "Failed to add to watchlist" });
    }
  });

  app.patch('/api/watchlist/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = updateWatchlistEntrySchema.parse(req.body);

      const entry = await storage.updateWatchlistEntry(id, updates);

      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }

      res.json(entry);
    } catch (error) {
      console.error("Error updating entry:", error);
      res.status(500).json({ message: "Failed to update entry" });
    }
  });

  app.delete('/api/watchlist/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWatchlistEntry(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting entry:", error);
      res.status(500).json({ message: "Failed to delete entry" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
