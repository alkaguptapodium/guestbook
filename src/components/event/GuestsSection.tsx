import { Users } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface GuestsSectionProps {
  guests: Attendee[];
}

export const GuestsSection = ({ guests }: GuestsSectionProps) => {
  console.log('Rendering GuestsSection with guests:', guests);
  
  // Filter attendees to show only guests with exact match for "Guest"
  const guestAttendees = guests.filter(attendee => {
    const isGuest = attendee.type === 'Guest';
    console.log(`Checking attendee ${attendee.name}: type=${attendee.type}, isGuest=${isGuest}`);
    return isGuest;
  });

  // Sort guests alphabetically by name
  const sortedGuests = [...guestAttendees].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <section>
      <div className="flex flex-col items-center gap-2 mb-12">
        <Users className="w-8 h-8 text-podium-dark mb-2" />
        <h2 className="font-uncut text-4xl font-semibold uppercase text-center">Guests</h2>
      </div>
      {sortedGuests.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No guests found for this event</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
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