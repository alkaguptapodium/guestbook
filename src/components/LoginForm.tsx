import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify against an approved list
    const isApproved = false;
    
    if (isApproved) {
      toast({
        title: "Welcome back!",
        description: "You now have full access to the event details.",
      });
    } else {
      window.location.href = "https://membership-waitlist.podiumsociety.com/";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <h2 className="font-playfair text-2xl font-semibold">Member Access</h2>
        <p className="text-muted-foreground">
          Please enter your email to view full event details.
        </p>
      </div>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" className="w-full bg-podium-gold hover:bg-podium-gold/90">
        Continue
      </Button>
    </form>
  );
};