import { Crown } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface HostsSectionProps {
  hosts: Attendee[];
}

export const HostsSection = ({ hosts }: HostsSectionProps) => {
  console.log('Rendering HostsSection with all attendees:', hosts);
  
  // Filter attendees to show only hosts with exact match for "Host"
  const hostAttendees = hosts.filter(attendee => {
    const isHost = attendee.type === 'Host';
    console.log(`Checking attendee ${attendee.name}: type=${attendee.type}, isHost=${isHost}`);
    return isHost;
  });

  // Sort hosts alphabetically by name
  const sortedHosts = [...hostAttendees].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <section className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-8 justify-center">
        <Crown className="w-6 h-6 text-podium-gold" />
        <h2 className="font-['Inter'] text-3xl font-semibold uppercase">Hosts</h2>
      </div>
      {sortedHosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No hosts found for this event</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 place-items-center">
          {sortedHosts.map((host) => (
            <AttendeeCard
              key={host.id}
              name={host.name}
              role={host.headline || "Host"}
              company=""
              imageUrl={host.image_url || "/placeholder.svg"}
              linkedIn={host.linkedin_url}
              isMemberView={false}
              type={host.type}
            />
          ))}
        </div>
      )}
    </section>
  );
};