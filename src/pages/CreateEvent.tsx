import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { RichTextEditor } from "@/components/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import Papa from 'papaparse';

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  });

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

  const processCSV = (file: File): Promise<Array<{ name: string; headline?: string; linkedin_url?: string; type: string; image_url: string }>> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const attendees = results.data.map((row: any) => ({
            name: row.Name || '',
            headline: row.Headline || null,
            linkedin_url: row['LinkedIn Link'] || null,
            type: row.Type || 'Guest', // Set default type to 'Guest' if not provided
            image_url: row['Profile Picture'] || null,
          })).filter(attendee => attendee.name); // Filter out rows without names
          resolve(attendees);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!eventImage || !csvFile) {
        throw new Error("Please provide both an event image and CSV file");
      }

      // Upload event image
      const imageFile = eventImage;
      const imageExt = imageFile.name.split('.').pop();
      const imagePath = `${crypto.randomUUID()}.${imageExt}`;

      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(imagePath, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data: { publicUrl: imageUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(imagePath);

      // Create event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .insert({
          name: eventName,
          image_url: imageUrl,
          description: editor?.getHTML() || '',
          sheet_url: '', // We keep this for backwards compatibility
        })
        .select()
        .single();

      if (eventError) throw eventError;

      // Process CSV and create attendees
      const attendees = await processCSV(csvFile);
      const { error: attendeesError } = await supabase
        .from('attendees')
        .insert(
          attendees.map(attendee => ({
            ...attendee,
            event_id: eventData.id
          }))
        );

      if (attendeesError) throw attendeesError;

      toast({
        title: "Success",
        description: "Event created successfully!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdf7] py-12">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-['uncut-sans'] uppercase mb-8">Create New Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <Label htmlFor="eventImage">Event Image</Label>
            <Input
              id="eventImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {eventImage && (
              <p className="text-sm text-muted-foreground">
                Selected: {eventImage.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Event Description</Label>
            <RichTextEditor editor={editor} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="csvFile">Attendees CSV File</Label>
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleCsvChange}
              required
            />
            {csvFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {csvFile.name}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              CSV should contain columns: Name, Headline, LinkedIn Link, Type (Guest/Host), Profile Picture (Google Drive URL)
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-podium-gold hover:bg-podium-gold/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;