
import { Users } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";
import { memo } from "react";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface GuestsSectionProps {
  guests: Attendee[];
}

export const GuestsSection = memo(({ guests }: GuestsSectionProps) => {
  // Filter attendees to show only guests with exact match for "Guest"
  const guestAttendees = guests.filter(attendee => attendee.type === 'Guest');

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
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mx-auto" style={{ maxWidth: "calc(100% - 1rem)" }}>
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
        </div>
      )}
    </section>
  );
});

GuestsSection.displayName = 'GuestsSection';
