import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, Loader2 } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { FilterBar } from "@/components/FilterBar";
import { AddTitleDialog } from "@/components/AddTitleDialog";
import { EntryDetailDialog } from "@/components/EntryDetailDialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { WatchlistEntry } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WatchlistEntry | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    mustWatch: false,
    movieOnly: false,
    tvOnly: false,
    streamingService: null as string | null,
    readyToWatch: false,
  });

  const { data: entries = [], isLoading, error, refetch } = useQuery<WatchlistEntry[]>({
    queryKey: ["/api/watchlist"],
  });

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  const streamingServices = useMemo(() => {
    const services = new Set<string>();
    entries.forEach(entry => {
      if (entry.streamingService) {
        services.add(entry.streamingService);
      }
    });
    return Array.from(services).sort();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      if (filters.mustWatch) {
        const bothHigh = entry.userAPriority === "high" && entry.userBPriority === "high";
        if (!bothHigh) return false;
      }

      if (filters.movieOnly && entry.type !== "movie") return false;
      if (filters.tvOnly && entry.type !== "series") return false;

      if (filters.streamingService && entry.streamingService !== filters.streamingService) {
        return false;
      }

      if (filters.readyToWatch) {
        const aUnwatched = !entry.userAProgress || entry.userAProgress === "Unwatched";
        const bUnwatched = !entry.userBProgress || entry.userBProgress === "Unwatched";
        if (!(aUnwatched && bUnwatched)) return false;
      }

      return true;
    });
  }, [entries, filters]);

  const handleCardClick = (entry: WatchlistEntry) => {
    setSelectedEntry(entry);
    setDetailDialogOpen(true);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 border-b flex items-center justify-between px-6 bg-background sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-heading font-bold" data-testid="text-header-title">
            WatchList
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              {user.profileImageUrl && (
                <img 
                  src={user.profileImageUrl} 
                  alt={user.firstName || "User"} 
                  className="w-8 h-8 rounded-full object-cover"
                  data-testid="img-user-avatar"
                />
              )}
              <span className="text-sm font-medium" data-testid="text-user-name">
                {user.firstName || user.email}
              </span>
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => window.location.href = "/api/logout"}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      <FilterBar
        activeFilters={filters}
        onFilterChange={handleFilterChange}
        streamingServices={streamingServices}
      />

      <main className="max-w-7xl mx-auto p-8">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
            ))}
          </div>
        ) : filteredEntries.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="grid-movies">
            {filteredEntries.map((entry) => (
              <MovieCard
                key={entry.id}
                entry={entry}
                onClick={() => handleCardClick(entry)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4" data-testid="text-empty-state">
              {entries.length === 0 
                ? "No titles in your watchlist yet. Add your first movie or TV show!"
                : "No matches found. Try different filters or add a new title!"}
            </p>
            <Button onClick={() => setAddDialogOpen(true)} data-testid="button-add-first">
              <Plus className="w-4 h-4 mr-2" />
              Add Title
            </Button>
          </div>
        )}
      </main>

      <Button
        size="lg"
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg"
        onClick={() => setAddDialogOpen(true)}
        data-testid="button-add-floating"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <AddTitleDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={() => refetch()}
      />

      <EntryDetailDialog
        entry={selectedEntry}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        currentUser={user}
        onUpdate={() => {
          refetch();
          setSelectedEntry(null);
        }}
      />
    </div>
  );
}
