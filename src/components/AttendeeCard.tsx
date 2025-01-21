import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AttendeeCardProps {
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  linkedIn?: string;
  email?: string;
  isMemberView: boolean;
  type?: string;
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
  type,
}: AttendeeCardProps) => {
  console.log('Rendering AttendeeCard with imageUrl:', imageUrl);
  console.log('Rendering AttendeeCard with type:', type);

  return (
    <Card className="w-full max-w-sm overflow-hidden animate-fadeIn">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={imageUrl}
            alt={`Profile photo of ${name}`}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            onError={(e) => {
              console.log('Image failed to load:', imageUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
          <AvatarFallback className="w-full h-full text-5xl font-bold bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4 space-y-2 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-uncut text-xl uppercase">{name}</h3>
          {linkedIn && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-[#0A66C2] hover:text-[#0A66C2]/90 hover:bg-transparent p-1"
              onClick={() => window.open(linkedIn, "_blank")}
            >
              <img 
                src="/lovable-uploads/abfe3634-5777-4b33-ba05-1b740c1bf753.png" 
                alt="LinkedIn"
                className="w-full h-full"
              />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground font-ovo">
          {role} {company && `at ${company}`}
        </p>
      </div>
    </Card>
  );
};