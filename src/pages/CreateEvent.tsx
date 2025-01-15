import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { supabase } from "@/integrations/supabase/client";
import { EventForm } from "@/components/event/EventForm";
import { processCSV } from "@/utils/csvProcessor";

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
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!eventImage || !csvFile) {
        throw new Error("Please provide both an event image and CSV file");
      }

      // Upload event image to Supabase Storage
      const timestamp = new Date().getTime();
      const fileExt = eventImage.name.split('.').pop();
      const filePath = `${timestamp}_${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('events')
        .upload(filePath, eventImage, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      // Create event with the storage URL
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .insert({
          name: eventName,
          image_url: publicUrl,
          description: editor?.getHTML() || "",
          sheet_url: "", // We keep this for backwards compatibility
        })
        .select()
        .single();

      if (eventError) throw eventError;

      // Process CSV and create attendees
      const attendees = await processCSV(csvFile);
      const { error: attendeesError } = await supabase
        .from("attendees")
        .insert(
          attendees.map((attendee) => ({
            ...attendee,
            event_id: eventData.id,
          }))
        );

      if (attendeesError) throw attendeesError;

      toast({
        title: "Success",
        description: "Event created successfully!",
      });

      // Navigate to the new event view page
      navigate(`/event/${eventData.id}`);
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
        <h1 className="text-3xl font-['uncut-sans'] uppercase mb-8">
          Create New Event
        </h1>
        <EventForm
          eventName={eventName}
          setEventName={setEventName}
          eventImage={eventImage}
          setEventImage={setEventImage}
          csvFile={csvFile}
          setCsvFile={setCsvFile}
          editor={editor}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateEvent;