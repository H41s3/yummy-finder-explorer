
import { Utensils } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-sm text-muted-foreground bg-gradient-to-b from-background to-purple-950/90">
      <div className="container px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-center gap-1">
          <Utensils className="h-4 w-4 text-purple-500" />
          <p>All Rights Reserved Cuisinefy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
