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
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch past events
  const { data: pastEvents } = useQuery({
    queryKey: ['past-events'],
    queryFn: async () => {
      console.log('Fetching past events...');
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching past events:', error);
        throw error;
      }
      
      return data;
    },
  });

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
    console.log("Starting event creation...");

    try {
      if (!eventImage || !csvFile) {
        throw new Error("Please provide both an event image and CSV file");
      }

      // Upload event image to Supabase Storage
      const timestamp = new Date().getTime();
      const fileExt = eventImage.name.split('.').pop();
      const filePath = `${timestamp}_${crypto.randomUUID()}.${fileExt}`;

      console.log("Uploading image...");
      const { error: uploadError, data } = await supabase.storage
        .from('events')
        .upload(filePath, eventImage, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      const slug = generateSlug(eventName);

      console.log("Creating event in database...");
      // Create event with the storage URL and slug
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .insert({
          name: eventName,
          image_url: publicUrl,
          description: editor?.getHTML() || "",
          sheet_url: "", // We keep this for backwards compatibility
          slug: slug, // Add the slug
        })
        .select()
        .single();

      if (eventError) {
        console.error("Event creation error:", eventError);
        throw eventError;
      }

      console.log("Processing CSV...");
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

      if (attendeesError) {
        console.error("Attendees creation error:", attendeesError);
        throw attendeesError;
      }

      toast({
        title: "Success",
        description: "Event created successfully!",
      });

      // Navigate to the new event view page using the slug
      console.log("Navigating to event page:", slug);
      navigate(`/event/${slug}`);
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
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

        {/* Past Events Section */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <CalendarDays className="w-6 h-6 text-gray-600" />
            <h2 className="font-['uncut-sans'] text-2xl uppercase">Past Events</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pastEvents?.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                onClick={() => navigate(`/event/${event.slug}`)}
              >
                {event.image_url && (
                  <div className="relative h-40 mb-4">
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="font-['uncut-sans'] text-lg font-medium mb-2">{event.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;