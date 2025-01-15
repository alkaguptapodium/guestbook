import Papa from "papaparse";

interface Attendee {
  name: string;
  headline?: string | null;
  linkedin_url?: string | null;
  type: string;
  image_url?: string | null;
}

const VALID_TYPES = ["Guest", "Host"];

export const processCSV = (file: File): Promise<Attendee[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const attendees = results.data
          .map((row: any) => {
            // Normalize the type field to ensure it's one of the valid values
            const rawType = row.Type || "Guest";
            const normalizedType = VALID_TYPES.includes(rawType) ? rawType : "Guest";
            
            return {
              name: row.Name || "",
              headline: row.Headline || null,
              linkedin_url: row["LinkedIn Link"] || null,
              type: normalizedType,
              image_url: row["Profile Picture"] || null,
            };
          })
          .filter((attendee: Attendee) => attendee.name); // Filter out entries without names
        
        resolve(attendees);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};