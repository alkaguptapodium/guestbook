import { Crown, Users } from "lucide-react";
import { EventHeader } from "@/components/EventHeader";
import { AttendeeCard } from "@/components/AttendeeCard";
import { Navigation } from "@/components/Navigation";

// Mock data to test filtering
const eventData = {
  title: "Future of Tech Leadership",
  date: "March 15, 2024",
  location: "San Francisco",
  imageUrl: "/lovable-uploads/5949c4a3-6e16-491f-a937-cb97d4c8ba20.png",
  attendees: [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Host & CTO",
      company: "TechVision Inc",
      imageUrl: "/lovable-uploads/505e2c61-bec6-4a53-9479-a3f7673e417f.png",
      linkedIn: "https://linkedin.com/in/sarahchen",
      email: "sarah@techvision.com",
      type: "Host"
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "VP Engineering",
      company: "InnovateLabs",
      imageUrl: "/lovable-uploads/1662dcf9-9f41-48fd-b1dd-8262db949d13.png",
      linkedIn: "https://linkedin.com/in/michaelrodriguez",
      email: "michael@innovatelabs.com",
      type: "Guest"
    },
    {
      id: "3",
      name: "Emma Thompson",
      role: "Product Director",
      company: "Future Tech",
      imageUrl: "/lovable-uploads/bea47329-c113-4b46-9ecd-ee4e086f4ee2.png",
      linkedIn: "https://linkedin.com/in/emmathompson",
      email: "emma@futuretech.com",
      type: "Guest"
    }
  ]
};

const Index = () => {
  console.log('All attendees:', eventData.attendees);
  
  // Filter hosts and guests
  const hosts = eventData.attendees.filter(attendee => {
    const isHost = attendee.type.trim() === 'Host';
    console.log(`Checking host ${attendee.name}: type=${attendee.type}, isHost=${isHost}`);
    return isHost;
  });

  const guests = eventData.attendees.filter(attendee => {
    const isGuest = attendee.type.trim() === 'Guest';
    console.log(`Checking guest ${attendee.name}: type=${attendee.type}, isGuest=${isGuest}`);
    return isGuest;
  });

  console.log('Filtered hosts:', hosts);
  console.log('Filtered guests:', guests);

  return (
    <div className="min-h-screen bg-[#fdfdf7]">
      <Navigation />
      <EventHeader
        title={eventData.title}
        date={eventData.date}
        location={eventData.location}
        imageUrl={eventData.imageUrl}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16 animate-fadeIn">
          {/* Hosts Section */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <Crown className="w-6 h-6 text-podium-gold" />
              <h2 className="font-['Inter'] text-3xl font-semibold uppercase">Hosts</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {hosts.map((host) => (
                <AttendeeCard
                  key={host.id}
                  name={host.name}
                  role={host.role}
                  company={host.company}
                  imageUrl={host.imageUrl}
                  linkedIn={host.linkedIn}
                  isMemberView={true}
                  type={host.type}
                />
              ))}
            </div>
          </section>

          {/* Guests Section */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <Users className="w-6 h-6 text-podium-dark" />
              <h2 className="font-['Inter'] text-3xl font-semibold uppercase">Guests</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {guests.map((guest) => (
                <AttendeeCard
                  key={guest.id}
                  name={guest.name}
                  role={guest.role}
                  company={guest.company}
                  imageUrl={guest.imageUrl}
                  linkedIn={guest.linkedIn}
                  isMemberView={true}
                  type={guest.type}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;