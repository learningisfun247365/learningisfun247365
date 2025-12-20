import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Film, Tv, Loader2 } from "lucide-react";
import type { WatchlistEntry, User } from "@shared/schema";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface EntryDetailDialogProps {
  entry: WatchlistEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: User | null;
  onUpdate: () => void;
}

export function EntryDetailDialog({ entry, open, onOpenChange, currentUser, onUpdate }: EntryDetailDialogProps) {
  const { toast } = useToast();
  const [userAPriority, setUserAPriority] = useState<string | undefined>(entry?.userAPriority || undefined);
  const [userBPriority, setUserBPriority] = useState<string | undefined>(entry?.userBPriority || undefined);
  const [userAProgress, setUserAProgress] = useState<string>(entry?.userAProgress || "Unwatched");
  const [userBProgress, setUserBProgress] = useState<string>(entry?.userBProgress || "Unwatched");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setUserAPriority(entry.userAPriority || undefined);
      setUserBPriority(entry.userBPriority || undefined);
      setUserAProgress(entry.userAProgress || "Unwatched");
      setUserBProgress(entry.userBProgress || "Unwatched");
    }
  }, [entry]);

  if (!entry) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiRequest("PATCH", `/api/watchlist/${entry.id}`, {
        userAPriority,
        userBPriority,
        userAProgress,
        userBProgress,
      });

      toast({
        title: "Updated successfully",
        description: "Your preferences have been saved.",
      });

      onUpdate();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not save your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-entry-detail">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {entry.type === "movie" ? (
              <Film className="w-5 h-5" />
            ) : (
              <Tv className="w-5 h-5" />
            )}
            {entry.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div>
            {entry.posterUrl ? (
              <img
                src={entry.posterUrl}
                alt={entry.title}
                className="w-full rounded-lg"
                data-testid="img-detail-poster"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                {entry.type === "movie" ? (
                  <Film className="w-16 h-16 text-muted-foreground" />
                ) : (
                  <Tv className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-plot">
                {entry.plot || "No plot summary available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {entry.genre && (
                <div>
                  <p className="text-muted-foreground">Genre</p>
                  <p className="font-medium" data-testid="text-genre">{entry.genre}</p>
                </div>
              )}
              {entry.runtime && (
                <div>
                  <p className="text-muted-foreground">Runtime</p>
                  <p className="font-medium" data-testid="text-runtime">{entry.runtime}</p>
                </div>
              )}
              {entry.streamingService && (
                <div>
                  <p className="text-muted-foreground">Streaming Service</p>
                  <Badge variant="secondary" data-testid="text-service">{entry.streamingService}</Badge>
                </div>
              )}
              {entry.imdbId && (
                <div>
                  <p className="text-muted-foreground">IMDb ID</p>
                  <p className="font-medium" data-testid="text-imdb">{entry.imdbId}</p>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="font-semibold">Your Preferences</h3>

              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">User A Priority</Label>
                  <ToggleGroup 
                    type="single" 
                    value={userAPriority} 
                    onValueChange={setUserAPriority}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="high" data-testid="toggle-user-a-high">
                      High
                    </ToggleGroupItem>
                    <ToggleGroupItem value="medium" data-testid="toggle-user-a-medium">
                      Medium
                    </ToggleGroupItem>
                    <ToggleGroupItem value="low" data-testid="toggle-user-a-low">
                      Low
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div>
                  <Label className="mb-2 block">User A Progress</Label>
                  {entry.type === "movie" ? (
                    <ToggleGroup 
                      type="single" 
                      value={userAProgress} 
                      onValueChange={setUserAProgress}
                      className="justify-start"
                    >
                      <ToggleGroupItem value="Unwatched" data-testid="toggle-user-a-unwatched">
                        Unwatched
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Watched" data-testid="toggle-user-a-watched">
                        Watched
                      </ToggleGroupItem>
                    </ToggleGroup>
                  ) : (
                    <Input
                      placeholder="e.g., S3 E5, Watched, Unwatched"
                      value={userAProgress}
                      onChange={(e) => setUserAProgress(e.target.value)}
                      data-testid="input-user-a-progress"
                    />
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">User B Priority</Label>
                  <ToggleGroup 
                    type="single" 
                    value={userBPriority} 
                    onValueChange={setUserBPriority}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="high" data-testid="toggle-user-b-high">
                      High
                    </ToggleGroupItem>
                    <ToggleGroupItem value="medium" data-testid="toggle-user-b-medium">
                      Medium
                    </ToggleGroupItem>
                    <ToggleGroupItem value="low" data-testid="toggle-user-b-low">
                      Low
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div>
                  <Label className="mb-2 block">User B Progress</Label>
                  {entry.type === "movie" ? (
                    <ToggleGroup 
                      type="single" 
                      value={userBProgress} 
                      onValueChange={setUserBProgress}
                      className="justify-start"
                    >
                      <ToggleGroupItem value="Unwatched" data-testid="toggle-user-b-unwatched">
                        Unwatched
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Watched" data-testid="toggle-user-b-watched">
                        Watched
                      </ToggleGroupItem>
                    </ToggleGroup>
                  ) : (
                    <Input
                      placeholder="e.g., S3 E5, Watched, Unwatched"
                      value={userBProgress}
                      onChange={(e) => setUserBProgress(e.target.value)}
                      data-testid="input-user-b-progress"
                    />
                  )}
                </div>
              </div>

              <Button 
                onClick={handleSave} 
                disabled={saving} 
                className="w-full"
                data-testid="button-save-preferences"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Preferences"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
