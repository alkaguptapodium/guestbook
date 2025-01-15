import { useState } from "react";
import { EventHeader } from "@/components/EventHeader";
import { AttendeeCard } from "@/components/AttendeeCard";
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Users, Crown } from "lucide-react";

// Mock data - in a real app, this would come from your backend
const eventData = {
  title: "Future of Tech Leadership",
  date: "March 15, 2024",
  location: "San Francisco, CA",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
  hosts: [
    {
      name: "Sarah Chen",
      role: "Host & CTO",
      company: "TechVision Inc",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      linkedIn: "https://linkedin.com",
      email: "sarah@techvision.com",
    }
  ],
  participants: [
    {
      name: "Michael Rodriguez",
      role: "VP Engineering",
      company: "InnovateLabs",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      linkedIn: "https://linkedin.com",
      email: "michael@innovatelabs.com",
    },
    {
      name: "Emma Thompson",
      role: "Product Director",
      company: "Future Tech",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      linkedIn: "https://linkedin.com",
      email: "emma@futuretech.com",
    }
  ],
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <EventHeader
        title={eventData.title}
        date={eventData.date}
        location={eventData.location}
        imageUrl={eventData.imageUrl}
      />
      
      <main className="container py-12">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-border animate-fadeIn">
            <LoginForm />
          </div>
        ) : (
          <div className="space-y-16 animate-fadeIn">
            {/* Hosts Section */}
            <section>
              <div className="flex items-center gap-2 mb-8">
                <Crown className="w-6 h-6 text-podium-gold" />
                <h2 className="font-playfair text-3xl font-semibold">Hosts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventData.hosts.map((host, index) => (
                  <AttendeeCard
                    key={index}
                    {...host}
                    isMemberView={isLoggedIn}
                  />
                ))}
              </div>
            </section>

            {/* Participants Section */}
            <section>
              <div className="flex items-center gap-2 mb-8">
                <Users className="w-6 h-6 text-podium-dark" />
                <h2 className="font-playfair text-3xl font-semibold">Participants</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventData.participants.map((participant, index) => (
                  <AttendeeCard
                    key={index}
                    {...participant}
                    isMemberView={isLoggedIn}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;