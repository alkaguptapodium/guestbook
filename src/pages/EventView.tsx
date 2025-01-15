import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventHeader } from "@/components/EventHeader";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Navigation } from "@/components/Navigation";
import { Crown, Users } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validate ID before making any queries
  useEffect(() => {
    if (!id) {
      toast({
        variant: "destructive",
        title: "Invalid Event",
        description: "No event ID provided. Redirecting to home page...",
      });
      navigate("/");
    }
  }, [id, navigate, toast]);

  const { data: event, isError: eventError } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("No event ID provided");
      console.log('Fetching event with ID:', id);
      
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error('Error fetching event:', error);
        throw error;
      }
      return data;
    },
    enabled: !!id, // Only run query if we have an ID
  });

  const { data: attendees, isError: attendeesError } = useQuery({
    queryKey: ["attendees", id],
    queryFn: async () => {
      if (!id) throw new Error("No event ID provided");
      console.log('Fetching attendees for event:', id);
      
      const { data, error } = await supabase
        .from("attendees")
        .select("*")
        .eq("event_id", id);

      if (error) {
        console.error('Error fetching attendees:', error);
        throw error;
      }
      return data;
    },
    enabled: !!id, // Only run query if we have an ID
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

  // Handle errors
  useEffect(() => {
    if (eventError || attendeesError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load event data. Please try again later.",
      });
    }
  }, [eventError, attendeesError, toast]);

  // Show loading state or error
  if (!event && !eventError) {
    return (
      <div className="min-h-screen bg-[#fdfdf7]">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="min-h-screen bg-[#fdfdf7]">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          Event not found
        </div>
      </div>
    );
  }

  const hosts = attendees?.filter((attendee) => attendee.type === "Host") || [];
  const guests = attendees?.filter((attendee) => attendee.type === "Guest") || [];

  return (
    <div className="min-h-screen bg-[#fdfdf7]">
      <Navigation />
      <EventHeader
        title={event.name}
        date={new Date().toLocaleDateString()}
        location=""
        imageUrl={event.image_url || ""}
      />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16 animate-fadeIn">
          {/* Hosts Section */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <Crown className="w-6 h-6 text-podium-gold" />
              <h2 className="font-['Inter'] text-3xl font-semibold uppercase">Hosts</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {hosts.map((host) => (
                <AttendeeCard
                  key={host.id}
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
              <h2 className="font-['Inter'] text-3xl font-semibold uppercase">Guests</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {guests.map((guest) => (
                <AttendeeCard
                  key={guest.id}
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
      </main>
    </div>
  );
};

export default EventView;