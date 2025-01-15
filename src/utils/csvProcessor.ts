import Papa from "papaparse";
import { supabase } from "@/integrations/supabase/client";

interface Attendee {
  name: string;
  headline?: string | null;
  linkedin_url?: string | null;
  type: string;
  image_url?: string | null;
}

const VALID_TYPES = ["Guest", "Host"];

async function processGoogleDriveImage(driveUrl: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke('process-gdrive-image', {
      body: { driveUrl }
    });

    if (error) {
      console.error('Error processing Google Drive image:', error);
      return null;
    }

    return data.url;
  } catch (error) {
    console.error('Error processing Google Drive image:', error);
    return null;
  }
}

export const processCSV = async (file: File): Promise<Attendee[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const attendeesPromises = results.data.map(async (row: any) => {
            // Normalize the type field
            const rawType = row.Type || "Guest";
            const normalizedType = VALID_TYPES.includes(rawType) ? rawType : "Guest";
            
            // Process Google Drive image if present
            let imageUrl = null;
            if (row["Profile Picture"] && row["Profile Picture"].includes('drive.google.com')) {
              console.log('Processing Google Drive image:', row["Profile Picture"]);
              imageUrl = await processGoogleDriveImage(row["Profile Picture"]);
            } else {
              imageUrl = row["Profile Picture"] || null;
            }
            
            return {
              name: row.Name || "",
              headline: row.Headline || null,
              linkedin_url: row["LinkedIn Link"] || null,
              type: normalizedType,
              image_url: imageUrl,
            };
          });

          const attendees = await Promise.all(attendeesPromises);
          resolve(attendees.filter((attendee: Attendee) => attendee.name));
        } catch (error) {
          console.error('Error processing attendees:', error);
          reject(error);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        reject(error);
      },
    });
  });
};