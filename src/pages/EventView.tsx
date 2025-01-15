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
        .single();

      if (error) throw error;
      return data as Event;
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
      <div className="min-h-screen bg-[#fdfdf7] flex items-center justify-center">
        <div className="text-2xl text-podium-dark">Event not found</div>
      </div>
    );
  }

  // Pass all attendees to both sections and let them handle their own filtering
  console.log('All attendees:', attendees);
  console.log('Hosts:', attendees?.filter(a => a.type === 'Host'));
  console.log('Guests:', attendees?.filter(a => a.type === 'Guest'));

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