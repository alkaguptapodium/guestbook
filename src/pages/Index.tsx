import { EventHeader } from "@/components/EventHeader";
import { Navigation } from "@/components/Navigation";
import { EventSection } from "@/components/EventSection";
import { eventData } from "@/data/mockEventData";

const Index = () => {
  console.log('All attendees:', eventData.attendees);
  
  const hosts = eventData.attendees.filter(attendee => attendee.type === 'Host');
  const guests = eventData.attendees.filter(attendee => attendee.type === 'Guest');

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
        description={eventData.description}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16 animate-fadeIn">
          <EventSection 
            title="Hosts" 
            icon="host" 
            attendees={hosts}
          />
          <EventSection 
            title="Guests" 
            icon="guest" 
            attendees={guests}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;