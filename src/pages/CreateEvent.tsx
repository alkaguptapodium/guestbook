import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { RichTextEditor } from "@/components/RichTextEditor";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [sheetUrl, setSheetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Underline,
    ],
    content: '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This is where we'll add the integration with Google Sheets and backend
      // after Supabase is connected
      toast({
        title: "Backend integration required",
        description: "Please connect Supabase to enable form submission.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
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
            <EditorContent editor={editor} className="hidden" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sheetUrl">Google Sheet URL</Label>
            <Input
              id="sheetUrl"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              required
            />
            <p className="text-sm text-muted-foreground">
              Sheet should contain columns: Name, Headline, LinkedIn Link, Type (Guest/Host), Image URL (Google Drive sharing link)
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