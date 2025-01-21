import { Circle } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="w-full bg-[#fdfdf7] border-b border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://www.podiumsociety.com/" className="flex items-center">
            <img
              src="/lovable-uploads/505e2c61-bec6-4a53-9479-a3f7673e417f.png"
              alt="Podium Logo"
              className="h-6 md:h-8 w-auto"
            />
          </a>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <a
              href="https://www.podiumsociety.com/"
              className="flex items-center text-sm md:text-base text-black hover:text-black/80 transition-colors"
            >
              <Circle className="w-2 h-2 mr-2" style={{ fill: '#c4cd23', color: '#c4cd23' }} />
              Membership
            </a>
            <a
              href="https://www.podiumsociety.com/retreat"
              className="flex items-center text-sm md:text-base text-black hover:text-black/80 transition-colors"
            >
              <Circle className="w-2 h-2 mr-2" style={{ fill: '#c4cd23', color: '#c4cd23' }} />
              Retreat
            </a>
            <a
              href="https://www.podiumsociety.com/about"
              className="flex items-center text-sm md:text-base text-black hover:text-black/80 transition-colors"
            >
              <Circle className="w-2 h-2 mr-2" style={{ fill: '#c4cd23', color: '#c4cd23' }} />
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};