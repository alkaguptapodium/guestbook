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
  console.log('Rendering AttendeeCard with imageUrl:', imageUrl); // Debug log

  return (
    <Card className="overflow-hidden animate-fadeIn">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={imageUrl}
            alt={`Profile photo of ${name}`}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            onError={(e) => {
              console.log('Image failed to load:', imageUrl); // Debug log
              e.currentTarget.style.display = 'none';
            }}
          />
          <AvatarFallback className="w-full h-full text-5xl font-bold bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
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