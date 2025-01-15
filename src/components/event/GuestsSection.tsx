import { Users } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface GuestsSectionProps {
  guests: Attendee[];
}

export const GuestsSection = ({ guests }: GuestsSectionProps) => {
  console.log('Rendering GuestsSection with guests:', guests); // Debug log

  // Filter attendees to only show guests with exact match
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
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6" />
        <h2 className="font-['Inter'] text-2xl font-semibold uppercase">Guests</h2>
      </div>
      {sortedGuests.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No guests found for this event</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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