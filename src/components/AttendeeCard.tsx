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

const convertImageUrl = (url: string): string => {
  console.log('Converting URL:', url);
  
  if (!url) {
    console.log('Empty URL, using placeholder');
    return "/placeholder.svg";
  }
  
  // Check if it's a Google Drive URL
  if (url.includes("drive.google.com")) {
    console.log('Converting Google Drive URL');
    // Extract the file ID
    const fileId = url.match(/[-\w]{25,}/);
    if (fileId) {
      const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
      console.log('Converted to:', convertedUrl);
      return convertedUrl;
    }
  }
  
  // If it's a relative URL (starts with /)
  if (url.startsWith('/')) {
    console.log('Using relative URL as is');
    return url;
  }
  
  // If it's already a full URL
  if (url.startsWith('http')) {
    console.log('Using full URL as is');
    return url;
  }
  
  console.log('Using original URL:', url);
  return url;
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
        <img
          src={convertImageUrl(imageUrl)}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          onError={(e) => {
            console.error('Image failed to load:', {
              originalUrl: imageUrl,
              convertedUrl: (e.target as HTMLImageElement).src,
              name: name,
              error: e
            });
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
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