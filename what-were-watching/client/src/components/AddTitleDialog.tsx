import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface AddTitleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface SearchResult {
  title: string;
  year: string;
  type: string;
  poster: string;
  imdbID: string;
}

export function AddTitleDialog({ open, onOpenChange, onSuccess }: AddTitleDialogProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<SearchResult | null>(null);
  const [streamingService, setStreamingService] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const results = await apiRequest<SearchResult[]>("GET", `/api/search-movies?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Could not search for titles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleAdd = async () => {
    if (!selectedTitle) return;

    setAdding(true);
    try {
      await apiRequest("POST", "/api/watchlist", {
        imdbId: selectedTitle.imdbID,
        streamingService: streamingService || undefined,
      });

      toast({
        title: "Added to watchlist",
        description: `${selectedTitle.title} has been added to your watchlist.`,
      });

      setSearchQuery("");
      setSearchResults([]);
      setSelectedTitle(null);
      setStreamingService("");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast({
        title: "Failed to add",
        description: "Could not add title to watchlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="dialog-add-title">
        <DialogHeader>
          <DialogTitle>Add Movie or TV Show</DialogTitle>
          <DialogDescription>
            Search for a title to add to your shared watchlist
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search for a movie or TV show..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                data-testid="input-search-title"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={searching || !searchQuery.trim()}
              data-testid="button-search"
            >
              {searching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <Label>Select a title:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.imdbID}
                    onClick={() => setSelectedTitle(result)}
                    className={`text-left p-3 rounded-lg border-2 transition-colors hover-elevate ${
                      selectedTitle?.imdbID === result.imdbID
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    data-testid={`button-select-${result.imdbID}`}
                  >
                    <div className="flex gap-3">
                      {result.poster !== "N/A" ? (
                        <img
                          src={result.poster}
                          alt={result.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-muted rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm line-clamp-2">{result.title}</p>
                        <p className="text-xs text-muted-foreground">{result.year}</p>
                        <p className="text-xs text-muted-foreground capitalize">{result.type}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTitle && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <Label htmlFor="streaming-service">Streaming Service (Optional)</Label>
                <Input
                  id="streaming-service"
                  placeholder="e.g., Netflix, Disney+, Hulu"
                  value={streamingService}
                  onChange={(e) => setStreamingService(e.target.value)}
                  data-testid="input-streaming-service"
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={handleAdd} 
                disabled={adding}
                className="w-full"
                data-testid="button-add-to-watchlist"
              >
                {adding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add to Watchlist"
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
