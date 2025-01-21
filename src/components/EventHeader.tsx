import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface EventHeaderProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description?: string;
}

export const EventHeader = ({ title, date, imageUrl, description }: EventHeaderProps) => {
  // Parse and format the date string
  const formattedDate = format(new Date(date), "EEEE, MMMM d");

  return (
    <>
      <div className="relative w-full h-[40vh] min-h-[300px]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-uncut mb-4 animate-fadeIn uppercase">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-lg animate-fadeIn font-ovo">
            <CalendarDays className="w-5 h-5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8 text-left animate-fadeIn">
          {description ? (
            <div 
              dangerouslySetInnerHTML={{ __html: description }} 
              className="prose prose-lg max-w-none text-podium-dark [&_p]:mb-6 last:[&_p]:mb-0 [&_a]:text-[#d66e33] [&_a]:hover:text-[#d66e33]/80 font-uncut" 
            />
          ) : (
            <div className="space-y-8 text-lg text-podium-dark font-uncut">
              <p>
                Watching our space come alive as we crafted a journey together was truly special. We hope you continue to step into the vision you see for yourself in 2025. ✨
              </p>
              
              <p>
                Thanks to Juliana for opening Motion's doors for this event. As an award-winning experiential agency, creating meaningful spaces for connection and growth is core to who they are. 🌱
              </p>
              
              <div className="space-y-2">
                <p>✨ Upcoming Experience ✨</p>
                <p>Join us for our Mid Year Reset retreat in Bali with Coach Charlotte!</p>
                <p>🌴 May 29th - June 1st, 2025</p>
                <p><a href="#" className="text-[#d66e33] hover:text-[#d66e33]/80">🌺 Know More</a></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};