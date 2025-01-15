import Papa from "papaparse";

interface Attendee {
  name: string;
  headline?: string | null;
  linkedin_url?: string | null;
  type: string;
  image_url?: string | null;
}

export const processCSV = (file: File): Promise<Attendee[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const attendees = results.data
          .map((row: any) => ({
            name: row.Name || "",
            headline: row.Headline || null,
            linkedin_url: row["LinkedIn Link"] || null,
            type: row.Type || "Guest",
            image_url: row["Profile Picture"] || null,
          }))
          .filter((attendee: Attendee) => attendee.name);
        resolve(attendees);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};