import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AttendeeCardProps {
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  linkedIn?: string;
  email?: string;
  isMemberView: boolean;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

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
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={imageUrl}
            alt={`Profile photo of ${name}`}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          <AvatarFallback className="w-full h-full text-4xl font-semibold bg-gradient-to-br from-gray-100 to-gray-200">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {role} {company && `at ${company}`}
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