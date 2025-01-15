import { supabase } from "@/integrations/supabase/client";
import Papa from 'papaparse';

interface Attendee {
  name: string;
  headline?: string | null;
  linkedin_url?: string | null;
  type: 'Host' | 'Guest';
  image_url?: string | null;
}

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

function normalizeType(type: string): 'Host' | 'Guest' {
  // Remove extra spaces and convert to lowercase for comparison
  const normalizedType = type.trim().toLowerCase();
  
  // Log the type normalization process
  console.log('Type normalization:', {
    original: type,
    trimmed: type.trim(),
    lowercase: normalizedType,
    final: normalizedType.includes('host') ? 'Host' : 'Guest'
  });
  
  // Check if the normalized string includes 'host' anywhere
  if (normalizedType.includes('host')) {
    return 'Host';
  }
  
  // Default to 'Guest' for any other value
  return 'Guest';
}

export const processCSV = async (file: File): Promise<Attendee[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          console.log('CSV Raw Data:', results.data);
          
          const attendeesPromises = results.data.map(async (row: any) => {
            // Log the raw row data
            console.log('Processing CSV row:', row);
            
            // Normalize the type field
            const normalizedType = normalizeType(row.Type || "");
            
            console.log(`Processing attendee ${row.Name}:`, {
              originalType: row.Type,
              normalizedType: normalizedType
            });
            
            // Process Google Drive image if present
            let imageUrl = null;
            if (row["Profile Picture"] && row["Profile Picture"].includes('drive.google.com')) {
              console.log('Processing Google Drive image:', row["Profile Picture"]);
              imageUrl = await processGoogleDriveImage(row["Profile Picture"]);
            } else {
              imageUrl = row["Profile Picture"] || null;
            }
            
            const attendee: Attendee = {
              name: row.Name || "",
              headline: row.Headline || null,
              linkedin_url: row["LinkedIn Link"] || null,
              type: normalizedType,
              image_url: imageUrl,
            };
            
            // Log the final attendee object
            console.log('Final attendee object:', attendee);
            
            return attendee;
          });

          const attendees = await Promise.all(attendeesPromises);
          resolve(attendees.filter((attendee): attendee is Attendee => Boolean(attendee.name)));
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