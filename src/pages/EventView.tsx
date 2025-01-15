import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { HostsSection } from "@/components/event/HostsSection";
import { GuestsSection } from "@/components/event/GuestsSection";
import { EventDetails } from "@/components/event/EventDetails";

const EventView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!slug) {
      toast({
        variant: "destructive",
        title: "Invalid Event",
        description: "No event slug provided. Redirecting to home page...",
      });
      navigate("/");
    }
  }, [slug, navigate, toast]);

  const { data: event, isError: eventError } = useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No event slug provided");
      console.log('Fetching event with slug:', slug);
      
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching event:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error("Event not found");
      }
      
      return data;
    },
    enabled: Boolean(slug),
  });

  const { data: attendees, isError: attendeesError } = useQuery({
    queryKey: ["attendees", event?.id],
    queryFn: async () => {
      if (!event?.id) throw new Error("No event ID available");
      console.log('Fetching attendees for event:', event.id);
      
      const { data, error } = await supabase
        .from("attendees")
        .select("*")
        .eq("event_id", event.id)
        .order('name');

      if (error) {
        console.error('Error fetching attendees:', error);
        throw error;
      }
      return data;
    },
    enabled: Boolean(event?.id),
  });

  useEffect(() => {
    if (event?.name) {
      document.title = event.name;
    }
    return () => {
      document.title = "Podium";
    };
  }, [event?.name]);

  useEffect(() => {
    if (eventError || attendeesError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load event data. Please try again later.",
      });
    }
  }, [eventError, attendeesError, toast]);

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

  const hosts = attendees?.filter(attendee => attendee.type === 'Host') || [];
  const guests = attendees?.filter(attendee => attendee.type === 'Guest') || [];

  console.log('Hosts:', hosts); // Debug log
  console.log('Guests:', guests); // Debug log

  return (
    <div className="min-h-screen bg-[#fdfdf7]">
      <Navigation />
      <EventDetails event={event} />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <div className="lg:col-span-3 space-y-12">
            <HostsSection hosts={hosts} />
            <GuestsSection guests={guests} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventView;