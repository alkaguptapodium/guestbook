import { EventHeader } from "@/components/EventHeader";
import { Database } from "@/integrations/supabase/types";

type Event = Database['public']['Tables']['events']['Row'];

interface EventDetailsProps {
  event: Event;
}

export const EventDetails = ({ event }: EventDetailsProps) => {
  return (
    <>
      <EventHeader
        title={event?.name || ""}
        date={event?.event_date || event?.created_at}
        location=""
        imageUrl={event?.image_url || ""}
      />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: event?.description || "" }}
        />
      </div>
    </>
  );
};