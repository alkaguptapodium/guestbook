import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventHeader } from "@/components/EventHeader";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Navigation } from "@/components/Navigation";
import { Crown, Users, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const EventView = () => {
  const { id } = useParams();

  const { data: event } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("No event ID provided");
      
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: attendees } = useQuery({
    queryKey: ["attendees", id],
    queryFn: async () => {
      if (!id) throw new Error("No event ID provided");
      
      const { data, error } = await supabase
        .from("attendees")
        .select("*")
        .eq("event_id", id);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Update document title when event data loads
  useEffect(() => {
    if (event?.name) {
      document.title = event.name;
    }
    // Reset title when component unmounts
    return () => {
      document.title = "Podium";
    };
  }, [event?.name]);

  const hosts = attendees?.filter((attendee) => attendee.type === "Host") || [];
  const guests = attendees?.filter((attendee) => attendee.type === "Guest") || [];

  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#fdfdf7]">
      <Navigation />
      <EventHeader
        title={event.name}
        date={new Date().toLocaleDateString()}
        location=""
        imageUrl={event.image_url || ""}
      />
      
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Attendees */}
          <div className="space-y-16 animate-fadeIn">
            {/* Hosts Section */}
            <section>
              <div className="flex items-center gap-2 mb-8">
                <Crown className="w-6 h-6 text-podium-gold" />
                <h2 className="font-['uncut-sans'] text-3xl font-semibold uppercase">Hosts</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {hosts.map((host, index) => (
                  <AttendeeCard
                    key={index}
                    name={host.name}
                    role={host.headline || "Host"}
                    company=""
                    imageUrl={host.image_url || "/placeholder.svg"}
                    linkedIn={host.linkedin_url}
                    isMemberView={false}
                  />
                ))}
              </div>
            </section>

            {/* Guests Section */}
            <section>
              <div className="flex items-center gap-2 mb-8">
                <Users className="w-6 h-6 text-podium-dark" />
                <h2 className="font-['uncut-sans'] text-3xl font-semibold uppercase">Guests</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {guests.map((guest, index) => (
                  <AttendeeCard
                    key={index}
                    name={guest.name}
                    role={guest.headline || "Guest"}
                    company=""
                    imageUrl={guest.image_url || "/placeholder.svg"}
                    linkedIn={guest.linkedin_url}
                    isMemberView={false}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Photos */}
          <div className="space-y-8 animate-fadeIn">
            <section>
              <div className="flex items-center justify-between gap-2 mb-8">
                <div className="flex items-center gap-2">
                  <Image className="w-6 h-6 text-podium-dark" />
                  <h2 className="font-['uncut-sans'] text-3xl font-semibold uppercase">Photos</h2>
                </div>
                <Button
                  variant="outline"
                  className="text-podium-gold hover:text-podium-gold/90"
                  onClick={() => window.open(event.sheet_url, "_blank")}
                >
                  View All Photos
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Event photo 1"
                  className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => window.open("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", "_blank")}
                />
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Event photo 2"
                  className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => window.open("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", "_blank")}
                />
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="Event photo 3"
                  className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => window.open("https://images.unsplash.com/photo-1649972904349-6e44c42644a7", "_blank")}
                />
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Event photo 4"
                  className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => window.open("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", "_blank")}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;