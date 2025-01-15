import { CalendarDays, MapPin } from "lucide-react";

interface EventHeaderProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

export const EventHeader = ({ title, date, location, imageUrl }: EventHeaderProps) => {
  return (
    <div className="relative w-full h-[40vh] min-h-[300px] mb-12">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 animate-fadeIn">
          {title}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 text-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span>{date}</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};