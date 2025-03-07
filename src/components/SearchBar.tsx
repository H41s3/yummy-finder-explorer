
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  className?: string;
}

const SearchBar = ({ onSearch, initialQuery = "", className }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-2xl mx-auto transition-all duration-300",
        isFocused ? "scale-[1.01]" : "scale-100",
        className
      )}
    >
      <div className={cn(
        "flex items-center bg-white rounded-xl border transition-all overflow-hidden",
        "shadow-sm hover:shadow-md focus-within:shadow-md",
        isFocused ? "border-primary ring-2 ring-primary/10" : "border-border"
      )}>
        <div className="flex items-center pl-4 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for recipes, ingredients, cuisines..."
          className="flex-1 p-3 px-4 border-none bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
          aria-label="Search recipes"
        />
        <button
          type="submit"
          className={cn(
            "p-3 m-1 rounded-lg transition-all text-white",
            "bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20",
            query.trim() === "" ? "opacity-80 cursor-not-allowed" : "opacity-100"
          )}
          disabled={query.trim() === ""}
          aria-label="Search"
        >
          <span className="mr-1 hidden sm:inline">Search</span>
          <Search className="h-5 w-5 inline-block" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
