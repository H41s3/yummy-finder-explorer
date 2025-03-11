
import { Utensils } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-gradient-to-b from-white to-blue-50/80 dark:from-gray-900 dark:to-slate-900/80">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-center gap-1">
          <Utensils className="h-4 w-4 text-primary/70" />
          <p>Recipe data provided by <a href="https://www.edamam.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edamam</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
