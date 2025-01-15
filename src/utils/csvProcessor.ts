import Papa from "papaparse";

interface Attendee {
  name: string;
  headline?: string | null;
  linkedin_url?: string | null;
  type: string;
  image_url?: string | null;
}

const VALID_TYPES = ["Guest", "Host"];

async function processGoogleDriveImage(driveUrl: string): Promise<string> {
  const response = await fetch('/functions/v1/process-gdrive-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ driveUrl }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error processing Google Drive image:', error);
    return null;
  }

  const { url } = await response.json();
  return url;
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
            }
            
            return {
              name: row.Name || "",
              headline: row.Headline || null,
              linkedin_url: row["LinkedIn Link"] || null,
              type: normalizedType,
              image_url: imageUrl || row["Profile Picture"] || null,
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