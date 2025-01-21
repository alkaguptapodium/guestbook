import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventDetails } from "@/components/event/EventDetails";
import { HostsSection } from "@/components/event/HostsSection";
import { GuestsSection } from "@/components/event/GuestsSection";
import { Navigation } from "@/components/Navigation";
import { Database } from "@/integrations/supabase/types";

type Event = Database['public']['Tables']['events']['Row'];
type Attendee = Database['public']['Tables']['attendees']['Row'];

const EventView = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Event | null;
    },
  });

  const { data: attendees, isLoading: attendeesLoading } = useQuery({
    queryKey: ['attendees', event?.id],
    enabled: !!event?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendees')
        .select('*')
        .eq('event_id', event.id);

      if (error) throw error;
      return data as Attendee[];
    },
  });

  if (eventLoading || attendeesLoading) {
    return (
      <div className="min-h-screen bg-[#fdfdf7] flex items-center justify-center">
        <div className="animate-pulse text-2xl text-podium-dark">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#fdfdf7]">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-semibold text-podium-dark mb-4">Event Not Found</h1>
          <p className="text-lg text-podium-dark/80">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfdf7]">
      <Navigation />
      <EventDetails event={event} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16 animate-fadeIn">
          <HostsSection hosts={attendees || []} />
          <GuestsSection guests={attendees || []} />
        </div>
      </main>
    </div>
  );
};

export default EventView;