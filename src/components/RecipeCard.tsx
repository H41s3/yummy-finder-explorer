
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Recipe } from "@/services/recipeService";
import { Clock, Droplet, ThermometerSun, Utensils, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RecipeDetails from "./RecipeDetails";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const RecipeCard = ({ recipe, className }: RecipeCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Reset isLoaded state when recipe changes
  useEffect(() => {
    setIsLoaded(false);
  }, [recipe.image]);

  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  // Placeholder shimmer effect
  const Shimmer = () => (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card 
          className={cn(
            "overflow-hidden border cursor-pointer group relative card-hover",
            "transform transition-all duration-300",
            className
          )}
        >
          <div className="relative w-full h-48 overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Utensils className="w-8 h-8 text-muted-foreground/40" />
                <Shimmer />
              </div>
            )}
            <img
              src={recipe.image}
              alt={recipe.label}
              className={cn(
                "w-full h-48 object-cover transition-all duration-500",
                isLoaded ? "opacity-100" : "opacity-0",
                "group-hover:scale-105"
              )}
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Diet label overlay */}
            {recipe.dietLabels.length > 0 && (
              <div className="absolute top-2 left-2">
                <Badge 
                  className="bg-primary/80 hover:bg-primary text-white backdrop-blur-standard px-2 py-1 text-xs" 
                  variant="default"
                >
                  {recipe.dietLabels[0]}
                </Badge>
              </div>
            )}
            
            {/* Calories overlay */}
            <div className="absolute bottom-2 right-2">
              <Badge 
                className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-standard px-2 py-1 text-xs" 
                variant="default"
              >
                {formatNumber(recipe.calories)} cal
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-base line-clamp-1 group-hover:text-primary transition-colors">
                {recipe.label}
              </h3>
              
              <div className="flex items-center text-xs text-muted-foreground gap-3">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{recipe.totalWeight > 1000 ? '60+ min' : '30+ min'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{recipe.yield} servings</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {recipe.cuisineType?.slice(0, 1).map(cuisine => (
                  <Badge key={cuisine} variant="outline" className="text-xs px-1.5 py-0 font-normal">
                    {cuisine}
                  </Badge>
                ))}
                {recipe.mealType?.slice(0, 1).map(meal => (
                  <Badge key={meal} variant="outline" className="text-xs px-1.5 py-0 font-normal">
                    {meal}
                  </Badge>
                ))}
                {recipe.dishType?.slice(0, 1).map(dish => (
                  <Badge key={dish} variant="outline" className="text-xs px-1.5 py-0 font-normal">
                    {dish}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <RecipeDetails recipe={recipe} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default RecipeCard;
