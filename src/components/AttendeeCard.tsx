import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

interface AttendeeCardProps {
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  linkedIn?: string;
  email?: string;
  isMemberView: boolean;
}

export const AttendeeCard = ({
  name,
  role,
  company,
  imageUrl,
  linkedIn,
  email,
  isMemberView,
}: AttendeeCardProps) => {
  return (
    <Card className="overflow-hidden animate-fadeIn">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {role} at {company}
        </p>
        {isMemberView && linkedIn && (
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(linkedIn, "_blank")}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};