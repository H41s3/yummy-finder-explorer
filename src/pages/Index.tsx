import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import FilterOptions from "@/components/FilterOptions";
import RecipeCard from "@/components/RecipeCard";
import Loader from "@/components/Loader";
import EmptyState, { InitialEmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { 
  searchRecipes, 
  Recipe, 
  SearchFilters
} from "@/services/recipeService";
import { Check, ChefHat, ChevronUp, Utensils, Home, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Index = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSuggestionClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      const suggestion = customEvent.detail.query;
      if (suggestion) {
        setQuery(suggestion);
        handleSearch(suggestion);
      }
    };
    
    window.addEventListener("suggestion-click", handleSuggestionClick);
    return () => window.removeEventListener("suggestion-click", handleSuggestionClick);
  }, [filters]);
  
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    setQuery(searchQuery);
    
    try {
      const response = await searchRecipes(searchQuery, filters);
      setRecipes(response.hits.map(hit => hit.recipe));
      
      if (response.hits.length === 0) {
        toast.info("No recipes found. Try adjusting your search or filters.");
      } else {
        toast.success(`Found ${response.hits.length} recipes!`, {
          icon: <Check className="h-4 w-4" />,
        });
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      toast.error("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (query) {
      handleSearch(query);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetToStart = () => {
    setQuery("");
    setFilters({});
    setRecipes([]);
    setHasSearched(false);
    toast.info("Returned to start page");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/80 to-white">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-20 transition-all shadow-md">
        <div className="container py-4 px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Recipe Finder</h1>
            </div>
            
            {hasSearched && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetToStart}
                className="flex items-center gap-1 rounded-full hover:bg-primary/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Start</span>
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            <SearchBar 
              onSearch={handleSearch} 
              initialQuery={query} 
            />
            
            {(hasSearched || Object.keys(filters).length > 0) && (
              <FilterOptions 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                className="animate-fade-in" 
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container px-4 py-6 md:px-6 max-w-7xl">
        {loading ? (
          <Loader />
        ) : !hasSearched ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <InitialEmptyState />
          </div>
        ) : recipes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.map((recipe, index) => (
                <div 
                  key={recipe.uri} 
                  className={cn(
                    "opacity-0",
                    "animate-slide-up",
                    {
                      "animation-delay-0": index % 4 === 0,
                      "animation-delay-[100ms]": index % 4 === 1,
                      "animation-delay-[200ms]": index % 4 === 2,
                      "animation-delay-[300ms]": index % 4 === 3,
                    }
                  )}
                  style={{
                    animationFillMode: "forwards",
                    animationDelay: `${(index % 4) * 100}ms`,
                  }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-gradient-to-b from-white to-blue-50/80">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-center gap-1">
            <Utensils className="h-4 w-4 text-primary/70" />
            <p>Recipe data provided by <a href="https://www.edamam.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edamam</a></p>
          </div>
        </div>
      </footer>
      
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "fixed bottom-4 right-4 rounded-full shadow-lg z-10 transition-all duration-300 transform bg-primary/90 text-white hover:bg-primary",
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Index;
