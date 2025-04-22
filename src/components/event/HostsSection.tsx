
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

  // If no hosts are found, don't render the section
  if (hostAttendees.length === 0) {
    return null;
  }

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
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mx-auto" style={{ maxWidth: "calc(100% - 1rem)" }}>
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
      </div>
    </section>
  );
});

HostsSection.displayName = 'HostsSection';
