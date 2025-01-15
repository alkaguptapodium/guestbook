import { Users } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface GuestsSectionProps {
  guests: Attendee[];
}

export const GuestsSection = ({ guests }: GuestsSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-podium-dark" />
        <h2 className="font-['Inter'] text-2xl font-semibold uppercase">Guests</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests?.map((guest) => (
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
  );
};