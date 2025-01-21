import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useMobile } from "@/hooks/use-mobile";

export const Navigation = () => {
  const isMobile = useMobile();

  return (
    <nav className="w-full bg-white border-b">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        <Link to="/" className="text-black font-medium">
          Connectopia
        </Link>
        {!isMobile && (
          <div className="flex items-center space-x-4">
            <Link to="/events" className="text-black hover:text-black/80">
              Events
            </Link>
            <Button>Sign In</Button>
          </div>
        )}
      </div>
    </nav>
  );
};