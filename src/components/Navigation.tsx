import { Circle } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://www.podiumsociety.com/" className="flex items-center">
            <img
              src="/lovable-uploads/505e2c61-bec6-4a53-9479-a3f7673e417f.png"
              alt="Podium Logo"
              className="h-8"
            />
          </a>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <a
              href="https://www.podiumsociety.com/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="https://www.podiumsociety.com/retreat"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Circle className="w-2 h-2 mr-2 fill-green-500 text-green-500" />
              Retreat
            </a>
            <a
              href="https://www.podiumsociety.com/"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Circle className="w-2 h-2 mr-2 fill-green-500 text-green-500" />
              Membership
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};