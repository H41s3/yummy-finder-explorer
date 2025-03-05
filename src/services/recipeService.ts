
import { toast } from "sonner";

// Recipe types
export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  calories: number;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: Record<string, { label: string; quantity: number; unit: string }>;
}

export interface RecipeResponse {
  hits: {
    recipe: Recipe;
  }[];
  count: number;
  from: number;
  to: number;
  more: boolean;
  q: string;
}

export interface SearchFilters {
  diet?: string[];
  health?: string[];
  cuisineType?: string[];
  mealType?: string[];
  dishType?: string[];
}

// Available filter options
export const dietOptions = [
  { value: "balanced", label: "Balanced" },
  { value: "high-fiber", label: "High Fiber" },
  { value: "high-protein", label: "High Protein" },
  { value: "low-carb", label: "Low Carb" },
  { value: "low-fat", label: "Low Fat" },
  { value: "low-sodium", label: "Low Sodium" },
];

export const healthOptions = [
  { value: "alcohol-free", label: "Alcohol-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "egg-free", label: "Egg-free" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "keto-friendly", label: "Keto" },
  { value: "kosher", label: "Kosher" },
  { value: "low-sugar", label: "Low Sugar" },
  { value: "paleo", label: "Paleo" },
  { value: "peanut-free", label: "Peanut-free" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
];

export const mealTypeOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "teatime", label: "Teatime" },
];

export const cuisineTypeOptions = [
  { value: "american", label: "American" },
  { value: "asian", label: "Asian" },
  { value: "caribbean", label: "Caribbean" },
  { value: "chinese", label: "Chinese" },
  { value: "french", label: "French" },
  { value: "indian", label: "Indian" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "mexican", label: "Mexican" },
  { value: "middle eastern", label: "Middle Eastern" },
];

// Edamam API configuration
// Note: In a production app, these would be stored in environment variables
const APP_ID = "4414e6ea"; // This is a demo app ID and should be replaced with a real one
const APP_KEY = "76c11f278d8e5ba3cedee1141a1b6d11"; // This is a demo app key and should be replaced with a real one
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

export const searchRecipes = async (
  query: string,
  filters: SearchFilters = {},
  from = 0,
  to = 20
): Promise<RecipeResponse> => {
  try {
    // Build URL with search query and filters
    const params = new URLSearchParams({
      type: "public",
      q: query,
      app_id: APP_ID,
      app_key: APP_KEY,
      from: from.toString(),
      to: to.toString(),
    });

    // Add filters if available
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        values.forEach((value) => {
          params.append(key, value);
        });
      }
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data as RecipeResponse;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    toast.error("Failed to fetch recipes. Please try again.");
    throw error;
  }
};

// Get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    // The ID from the URI needs to be encoded
    const recipeId = id.replace("http://www.edamam.com/ontologies/edamam.owl#recipe_", "");
    
    const params = new URLSearchParams({
      type: "public",
      app_id: APP_ID,
      app_key: APP_KEY,
      id: recipeId,
    });

    const response = await fetch(`${BASE_URL}/${recipeId}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.recipe as Recipe;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    toast.error("Failed to fetch recipe details. Please try again.");
    return null;
  }
};

// Helper function to extract recipe ID from URI
export const getRecipeIdFromUri = (uri: string): string => {
  return uri.split("#recipe_")[1];
};
