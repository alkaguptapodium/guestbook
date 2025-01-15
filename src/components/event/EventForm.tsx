import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/RichTextEditor";
import { FileUpload } from "./FileUpload";
import { Editor } from "@tiptap/react";

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
}: EventFormProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
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
        helperText="CSV should contain columns: Name, Headline, LinkedIn Link, Type (Guest/Host), Profile Picture (Google Drive URL)"
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