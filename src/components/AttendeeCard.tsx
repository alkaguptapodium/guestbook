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
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-playfair text-xl font-semibold">{name}</h3>
          {linkedIn && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#0A66C2] hover:text-[#0A66C2]/90 hover:bg-[#0A66C2]/10 p-1.5"
              onClick={() => window.open(linkedIn, "_blank")}
            >
              <img 
                src="/lovable-uploads/bea47329-c113-4b46-9ecd-ee4e086f4ee2.png" 
                alt="LinkedIn"
                className="w-full h-full"
              />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {role} {company && `at ${company}`}
        </p>
      </div>
    </Card>
  );
};