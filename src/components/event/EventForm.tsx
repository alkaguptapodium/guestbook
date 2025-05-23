import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/RichTextEditor";
import { FileUpload } from "./FileUpload";
import { Editor } from "@tiptap/react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface EventFormProps {
  eventName: string;
  setEventName: (name: string) => void;
  eventImage: File | null;
  setEventImage: (file: File | null) => void;
  csvFile: File | null;
  setCsvFile: (file: File | null) => void;
  editor: Editor | null;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  eventDate: Date;
  setEventDate: (date: Date) => void;
}

export const EventForm = ({
  eventName,
  setEventName,
  eventImage,
  setEventImage,
  csvFile,
  setCsvFile,
  editor,
  isLoading,
  onSubmit,
  eventDate,
  setEventDate,
}: EventFormProps) => {
  const { toast } = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file",
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image must be less than 5MB",
        });
        return;
      }

      setEventImage(file);
    }
  };

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Input
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Future of Tech Leadership"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Event Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !eventDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={eventDate}
              onSelect={(date) => date && setEventDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <FileUpload
        id="eventImage"
        label="Event Image"
        accept="image/*"
        onChange={handleImageChange}
        file={eventImage}
      />

      <div className="space-y-2">
        <Label>Event Description</Label>
        <RichTextEditor editor={editor} />
      </div>

      <FileUpload
        id="csvFile"
        label="Attendees CSV File"
        accept=".csv"
        onChange={handleCsvChange}
        file={csvFile}
        helperText="CSV should contain columns: Name, Headline, LinkedIn Link, Type (Guest/Host), Profile Picture URL"
      />

      <Button
        type="submit"
        className="w-full bg-podium-gold hover:bg-podium-gold/90"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Event"}
      </Button>
    </form>
  );
};