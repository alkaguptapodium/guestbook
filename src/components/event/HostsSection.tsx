import { Crown } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";
import { memo } from "react";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface HostsSectionProps {
  hosts: Attendee[];
}

export const HostsSection = memo(({ hosts }: HostsSectionProps) => {
  // Filter attendees to show only hosts with exact match for "Host"
  const hostAttendees = hosts.filter(attendee => attendee.type === 'Host');

  // Sort hosts alphabetically by name
  const sortedHosts = [...hostAttendees].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <section className="mb-16">
      <div className="flex flex-col items-center gap-2 mb-12">
        <Crown className="w-8 h-8 text-podium-dark mb-2" />
        <h2 className="font-uncut text-4xl font-semibold uppercase text-center">Hosts</h2>
      </div>
      {sortedHosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No hosts found for this event</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
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
});

HostsSection.displayName = 'HostsSection';