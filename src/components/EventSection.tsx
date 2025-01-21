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
    <section className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 mb-12">
        {icon === "host" ? (
          <Crown className="w-8 h-8 text-podium-gold" />
        ) : (
          <Users className="w-8 h-8 text-podium-dark" />
        )}
        <h2 className="font-uncut text-4xl font-semibold uppercase text-center">{title}</h2>
      </div>
      <div className="w-full max-w-[280px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
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