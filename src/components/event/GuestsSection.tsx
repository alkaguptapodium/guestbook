import { Users } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface GuestsSectionProps {
  guests: Attendee[];
}

export const GuestsSection = ({ guests }: GuestsSectionProps) => {
  console.log('Rendering GuestsSection with guests:', guests);
  
  // Filter attendees to show only guests, checking case-insensitive and trimming spaces
  const guestAttendees = guests.filter(attendee => {
    const normalizedType = attendee.type?.trim().toLowerCase() || '';
    const isGuest = normalizedType.includes('guest');
    console.log(`Checking attendee ${attendee.name}: type=${attendee.type}, normalizedType=${normalizedType}, isGuest=${isGuest}`);
    return isGuest;
  });

  // Sort guests alphabetically by name
  const sortedGuests = [...guestAttendees].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <section>
      <div className="flex items-center gap-2 mb-8">
        <Users className="w-6 h-6 text-podium-gold" />
        <h2 className="font-['Inter'] text-3xl font-semibold uppercase">Guests</h2>
      </div>
      {sortedGuests.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No guests found for this event</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedGuests.map((guest) => (
            <AttendeeCard
              key={guest.id}
              name={guest.name}
              role={guest.headline || "Guest"}
              company=""
              imageUrl={guest.image_url || "/placeholder.svg"}
              linkedIn={guest.linkedin_url}
              isMemberView={false}
              type={guest.type}
            />
          ))}
        </div>
      )}
    </section>
  );
};