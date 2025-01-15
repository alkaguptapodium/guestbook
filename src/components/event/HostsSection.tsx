import { Crown } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Database } from "@/integrations/supabase/types";

type Attendee = Database['public']['Tables']['attendees']['Row'];

interface HostsSectionProps {
  hosts: Attendee[];
}

export const HostsSection = ({ hosts }: HostsSectionProps) => {
  console.log('Rendering HostsSection with hosts:', hosts); // Debug log

  // Sort hosts alphabetically by name
  const sortedHosts = [...hosts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Crown className="w-6 h-6 text-podium-gold" />
        <h2 className="font-['Inter'] text-2xl font-semibold uppercase">Hosts</h2>
      </div>
      {sortedHosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No hosts found for this event</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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