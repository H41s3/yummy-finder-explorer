
import { useState } from "react";
import { X, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface SavedSearchesProps {
  onSearchSelect: (query: string) => void;
  className?: string;
}

const SavedSearches = ({ onSearchSelect, className }: SavedSearchesProps) => {
  const [savedSearches, setSavedSearches] = useLocalStorage<string[]>("recipe-finder-searches", []);

  const handleClearAll = () => {
    setSavedSearches([]);
  };

  const handleRemoveSearch = (index: number) => {
    setSavedSearches(savedSearches.filter((_, i) => i !== index));
  };

  if (savedSearches.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Recent Searches</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
          onClick={handleClearAll}
        >
          Clear all
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {savedSearches.map((search, index) => (
          <div 
            key={index}
            className="flex items-center gap-1 bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full text-sm transition-colors group cursor-pointer"
          >
            <Search className="h-3 w-3 text-muted-foreground" />
            <span 
              className="max-w-[150px] truncate"
              onClick={() => onSearchSelect(search)}
            >
              {search}
            </span>
            <button 
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSearch(index);
              }}
              aria-label={`Remove ${search} from saved searches`}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearches;
