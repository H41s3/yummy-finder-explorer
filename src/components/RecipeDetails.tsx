
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recipe } from "@/services/recipeService";
import { CalendarDays, Clock, ExternalLink, Flame, Users, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "./ui/dialog";

interface RecipeDetailsProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetails = ({ recipe, onClose }: RecipeDetailsProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };
  
  // Convert to uppercase first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Accessibility title (visually hidden) */}
      <DialogTitle className="sr-only">{recipe.label}</DialogTitle>
      
      {/* Header with image */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <div className="absolute top-2 right-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="bg-black/50 text-white hover:bg-black/70 rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse" />
          )}
          <img
            src={recipe.image}
            alt={recipe.label}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h2 className="text-white text-xl font-medium drop-shadow-md">
            {recipe.label}
          </h2>
          <div className="flex items-center text-white/90 text-sm mt-1">
            <span className="opacity-90">{recipe.source}</span>
          </div>
        </div>
      </div>
      
      {/* Quick info bar */}
      <div className="grid grid-cols-3 gap-1 py-3 px-4 border-b flex-shrink-0">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center text-muted-foreground mb-1">
            <Flame className="w-4 h-4 mr-1" />
            <span className="text-xs">Calories</span>
          </div>
          <span className="font-medium">{formatNumber(recipe.calories)}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center border-l border-r px-2">
          <div className="flex items-center text-muted-foreground mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-xs">Cook Time</span>
          </div>
          <span className="font-medium">{recipe.totalWeight > 1000 ? '60+ min' : '30+ min'}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center text-muted-foreground mb-1">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-xs">Servings</span>
          </div>
          <span className="font-medium">{recipe.yield}</span>
        </div>
      </div>
      
      {/* Content tabs */}
      <Tabs defaultValue="ingredients" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 border-b flex-shrink-0">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent space-x-4">
            <TabsTrigger value="ingredients" className="pb-2 pt-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition" className="pb-2 pt-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Nutrition</TabsTrigger>
            <TabsTrigger value="details" className="pb-2 pt-2 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Details</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Tab content wrapper with overflow handling */}
        <div className="flex-1 overflow-hidden min-h-0">
          <TabsContent 
            value="ingredients" 
            className="h-full overflow-y-auto py-4 px-4"
          >
            <div className="space-y-1 pb-20">
              <h3 className="font-medium text-lg">Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                {recipe.ingredientLines.length} items
              </p>
              
              <ul className="mt-3 space-y-2">
                {recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 text-xs">
                      {index + 1}
                    </span>
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Fixed position button at bottom */}
            <div className="sticky bottom-0 left-0 right-0 bg-background pt-4 pb-6 mt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
              >
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <span>View Full Recipe</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent 
            value="nutrition" 
            className="h-full overflow-y-auto py-4 px-4"
          >
            <div className="space-y-1 pb-20">
              <h3 className="font-medium text-lg">Nutrition Information</h3>
              <p className="text-sm text-muted-foreground">
                Per serving, based on {recipe.yield} servings
              </p>
              
              <div className="mt-4 space-y-3">
                {Object.entries(recipe.totalNutrients)
                  .filter(([key]) => [
                    'ENERC_KCAL', 'FAT', 'FASAT', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT', 'CHOLE', 'NA'
                  ].includes(key))
                  .map(([key, nutrient]) => {
                    const perServing = nutrient.quantity / recipe.yield;
                    return (
                      <div key={key} className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-sm">{nutrient.label}</span>
                        <span className="text-sm font-medium">
                          {Math.round(perServing)} {nutrient.unit}
                        </span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            
            {/* Fixed position button at bottom */}
            <div className="sticky bottom-0 left-0 right-0 bg-background pt-4 pb-6 mt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
              >
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <span>View Full Recipe</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent 
            value="details" 
            className="h-full overflow-y-auto py-4 px-4"
          >
            <div className="space-y-4 pb-20">
              {recipe.dietLabels.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Diet</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.dietLabels.map(label => (
                      <Badge key={label} variant="secondary" className="px-2.5 py-1">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {recipe.healthLabels.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Health Labels</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.healthLabels
                      .filter(label => !label.includes("_"))
                      .map(label => (
                        <Badge key={label} variant="outline" className="px-2.5 py-1">
                          {capitalize(label.replace(/-/g, ' '))}
                        </Badge>
                      ))
                    }
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  {recipe.cuisineType?.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground">Cuisine</span>
                      <p className="mt-1">{recipe.cuisineType.map(capitalize).join(', ')}</p>
                    </div>
                  )}
                  
                  {recipe.mealType?.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground">Meal Type</span>
                      <p className="mt-1">{recipe.mealType.map(capitalize).join(', ')}</p>
                    </div>
                  )}
                  
                  {recipe.dishType?.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground">Dish Type</span>
                      <p className="mt-1">{recipe.dishType.map(capitalize).join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {recipe.cautions.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Cautions</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.cautions.map(caution => (
                      <Badge key={caution} variant="destructive" className="px-2.5 py-1">
                        {caution}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Separator />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Recipe data provided by <a href="https://www.edamam.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edamam</a></p>
                  <p className="mt-1">
                    <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                      View original recipe
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Fixed position button at bottom */}
            <div className="sticky bottom-0 left-0 right-0 bg-background pt-4 pb-6 mt-4">
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
              >
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <span>View Full Recipe</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default RecipeDetails;
