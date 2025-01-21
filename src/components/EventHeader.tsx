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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['uncut-sans'] font-normal mb-4 animate-fadeIn uppercase">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-lg animate-fadeIn">
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
              className="text-lg text-podium-dark [&_p]:mb-8 last:[&_p]:mb-0 [&_a]:text-[#d66e33] [&_a]:hover:text-[#d66e33]/80" 
            />
          ) : (
            <>
              <p className="text-lg text-podium-dark mb-8">
                Thanks for a soulful Saturday morning on Nov 16! We know that many of you want to meet even more women than you managed to connect with in person.
              </p>
              
              <p className="text-lg text-podium-dark mb-8">
                So as we get our new membership up and running, we'll be building more pages like these for Podium members to use after every experience that we host. We can't wait to launch more features to enable meaningful connections between women.
              </p>
              
              <p className="text-lg text-podium-dark">
                Scroll to see who else was in the room, and if you want to see all the photos then{" "}
                <a href="#" className="text-[#d66e33] hover:text-[#d66e33]/80">click here</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};