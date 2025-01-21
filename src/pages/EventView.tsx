import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventDetails } from "@/components/event/EventDetails";
import { HostsSection } from "@/components/event/HostsSection";
import { GuestsSection } from "@/components/event/GuestsSection";
import { Navigation } from "@/components/Navigation";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

type Event = Database['public']['Tables']['events']['Row'];
type Attendee = Database['public']['Tables']['attendees']['Row'];

const EventView = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Query to fetch all events
  const { data: allEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  // Query to fetch specific event if slug is provided
  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ['event', slug],
    enabled: !!slug,
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

  if (eventsLoading || (slug && (eventLoading || attendeesLoading))) {
    return (
      <div className="min-h-screen bg-[#fdfdf7] flex items-center justify-center">
        <div className="animate-pulse text-2xl text-podium-dark">Loading...</div>
      </div>
    );
  }

  // If no slug is provided, show the events grid
  if (!slug) {
    return (
      <div className="min-h-screen bg-[#fdfdf7]">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">All Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents?.map((event) => (
              <Card 
                key={event.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/event/${event.slug}`)}
              >
                <CardContent className="p-6">
                  {event.image_url && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {format(new Date(event.event_date), 'PPP')}
                  </p>
                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Show event details if slug is provided
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