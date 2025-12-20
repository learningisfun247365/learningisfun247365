import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Tv } from "lucide-react";
import type { WatchlistEntry } from "@shared/schema";

interface MovieCardProps {
  entry: WatchlistEntry;
  onClick: () => void;
}

export function MovieCard({ entry, onClick }: MovieCardProps) {
  const sharedPriorityScore = calculateSharedPriority(entry);
  const jointWatchStatus = calculateJointStatus(entry);
  
  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer border-0 rounded-lg hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`card-movie-${entry.id}`}
    >
      <div className="aspect-[2/3] relative">
        {entry.posterUrl ? (
          <img
            src={entry.posterUrl}
            alt={entry.title}
            className="w-full h-full object-cover"
            data-testid={`img-poster-${entry.id}`}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            {entry.type === "movie" ? (
              <Film className="w-16 h-16 text-muted-foreground" />
            ) : (
              <Tv className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {sharedPriorityScore === "must-watch" && (
            <Badge 
              className="bg-destructive/90 hover:bg-destructive text-destructive-foreground backdrop-blur-sm font-semibold text-xs shadow-lg no-default-hover-elevate"
              data-testid={`badge-must-watch-${entry.id}`}
            >
              🔥 MUST WATCH
            </Badge>
          )}
          
          {jointWatchStatus === "spoiler-alert" && (
            <Badge 
              className="bg-amber-500/90 hover:bg-amber-500 text-white backdrop-blur-sm font-semibold text-xs shadow-lg no-default-hover-elevate"
              data-testid={`badge-spoiler-${entry.id}`}
            >
              ⚠️ SPOILER ALERT
            </Badge>
          )}
          
          {jointWatchStatus === "completed" && (
            <Badge 
              className="bg-green-600/90 hover:bg-green-600 text-white backdrop-blur-sm font-semibold text-xs shadow-lg no-default-hover-elevate"
              data-testid={`badge-completed-${entry.id}`}
            >
              ✅ Completed
            </Badge>
          )}
          
          {jointWatchStatus === "ready" && (
            <Badge 
              className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm font-semibold text-xs shadow-lg no-default-hover-elevate"
              data-testid={`badge-ready-${entry.id}`}
            >
              🍿 Ready to Watch
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {entry.streamingService && (
            <Badge 
              variant="secondary" 
              className="mb-2 backdrop-blur-sm bg-background/70 text-xs"
              data-testid={`badge-service-${entry.id}`}
            >
              {entry.streamingService}
            </Badge>
          )}
          <h3 
            className="text-white font-semibold text-lg leading-tight line-clamp-2"
            data-testid={`text-title-${entry.id}`}
          >
            {entry.title}
          </h3>
        </div>
      </div>
    </Card>
  );
}

function calculateSharedPriority(entry: WatchlistEntry): "must-watch" | "medium" | null {
  if (entry.userAPriority === "high" && entry.userBPriority === "high") {
    return "must-watch";
  }
  if (entry.userAPriority === "high" || entry.userBPriority === "high") {
    return "medium";
  }
  return null;
}

function calculateJointStatus(entry: WatchlistEntry): "completed" | "spoiler-alert" | "ready" | null {
  const aWatched = entry.userAProgress === "Watched";
  const bWatched = entry.userBProgress === "Watched";
  const aUnwatched = !entry.userAProgress || entry.userAProgress === "Unwatched";
  const bUnwatched = !entry.userBProgress || entry.userBProgress === "Unwatched";
  
  if (aWatched && bWatched) {
    return "completed";
  }
  
  if ((aWatched && !bWatched) || (!aWatched && bWatched)) {
    return "spoiler-alert";
  }
  
  if (entry.type === "series") {
    const aProgress = entry.userAProgress || "";
    const bProgress = entry.userBProgress || "";
    
    if (aProgress !== bProgress && aProgress && bProgress && aProgress !== "Unwatched" && bProgress !== "Unwatched") {
      return "spoiler-alert";
    }
  }
  
  if (aUnwatched && bUnwatched) {
    return "ready";
  }
  
  return null;
}
