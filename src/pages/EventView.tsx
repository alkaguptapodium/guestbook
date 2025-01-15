import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventHeader } from "@/components/EventHeader";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Navigation } from "@/components/Navigation";
import { Crown, Users } from "lucide-react";
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
        <div className="grid grid-cols-1 gap-12">
          {/* Attendees */}
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
        </div>
      </div>
    </div>
  );
};

export default EventView;