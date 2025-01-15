import { useState } from "react";
import { EventHeader } from "@/components/EventHeader";
import { AttendeeCard } from "@/components/AttendeeCard";
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

// Mock data - in a real app, this would come from your backend
const eventData = {
  title: "Future of Tech Leadership",
  date: "March 15, 2024",
  location: "San Francisco, CA",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
  attendees: [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "TechVision Inc",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      linkedIn: "https://linkedin.com",
      email: "sarah@techvision.com",
    },
    {
      name: "Michael Rodriguez",
      role: "VP Engineering",
      company: "InnovateLabs",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      linkedIn: "https://linkedin.com",
      email: "michael@innovatelabs.com",
    },
    // Add more attendees as needed
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
          <LoginForm />
        ) : (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair text-3xl font-semibold mb-4">Event Attendees</h2>
              <p className="text-muted-foreground">
                Connect with fellow attendees and expand your professional network.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventData.attendees.map((attendee, index) => (
                <AttendeeCard
                  key={index}
                  {...attendee}
                  isMemberView={isLoggedIn}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;