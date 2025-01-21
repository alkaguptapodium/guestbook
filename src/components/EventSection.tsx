import { Crown, Users } from "lucide-react";
import { AttendeeCard } from "@/components/AttendeeCard";

interface Attendee {
  id: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  linkedIn?: string;
  type: string;
}

interface EventSectionProps {
  title: string;
  icon: "host" | "guest";
  attendees: Attendee[];
}

export const EventSection = ({ title, icon, attendees }: EventSectionProps) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-8 justify-center">
        {icon === "host" ? (
          <Crown className="w-6 h-6 text-podium-gold" />
        ) : (
          <Users className="w-6 h-6 text-podium-dark" />
        )}
        <h2 className="font-uncut text-3xl font-semibold uppercase">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto px-4">
        {attendees.map((attendee) => (
          <AttendeeCard
            key={attendee.id}
            name={attendee.name}
            role={attendee.role}
            company={attendee.company}
            imageUrl={attendee.imageUrl}
            linkedIn={attendee.linkedIn}
            isMemberView={true}
            type={attendee.type}
          />
        ))}
      </div>
    </section>
  );
};