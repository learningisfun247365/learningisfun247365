import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Film, Tv, Flame, Eye } from "lucide-react";

interface FilterBarProps {
  activeFilters: {
    mustWatch: boolean;
    movieOnly: boolean;
    tvOnly: boolean;
    streamingService: string | null;
    readyToWatch: boolean;
  };
  onFilterChange: (filters: Partial<FilterBarProps["activeFilters"]>) => void;
  streamingServices: string[];
}

export function FilterBar({ activeFilters, onFilterChange, streamingServices }: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-background border-b p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            variant={activeFilters.mustWatch ? "default" : "outline"}
            size="default"
            onClick={() => onFilterChange({ mustWatch: !activeFilters.mustWatch })}
            data-testid="button-filter-must-watch"
            className="gap-2"
          >
            <Flame className="w-4 h-4" />
            Must Watch
          </Button>
          
          <Button
            variant={activeFilters.movieOnly ? "default" : "outline"}
            size="default"
            onClick={() => onFilterChange({ 
              movieOnly: !activeFilters.movieOnly,
              tvOnly: false 
            })}
            data-testid="button-filter-movies"
            className="gap-2"
          >
            <Film className="w-4 h-4" />
            Movies
          </Button>
          
          <Button
            variant={activeFilters.tvOnly ? "default" : "outline"}
            size="default"
            onClick={() => onFilterChange({ 
              tvOnly: !activeFilters.tvOnly,
              movieOnly: false 
            })}
            data-testid="button-filter-tv"
            className="gap-2"
          >
            <Tv className="w-4 h-4" />
            TV Shows
          </Button>
          
          <Button
            variant={activeFilters.readyToWatch ? "default" : "outline"}
            size="default"
            onClick={() => onFilterChange({ readyToWatch: !activeFilters.readyToWatch })}
            data-testid="button-filter-ready"
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Ready to Watch
          </Button>
          
          <Select
            value={activeFilters.streamingService || "all"}
            onValueChange={(value) => onFilterChange({ 
              streamingService: value === "all" ? null : value 
            })}
          >
            <SelectTrigger className="w-48" data-testid="select-streaming-service">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {streamingServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
