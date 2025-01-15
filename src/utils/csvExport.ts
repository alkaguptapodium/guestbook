import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface Attendee {
  name: string;
  role: string;
  company: string;
  type: string;
  linkedIn?: string;
}

export const exportAttendeesToCSV = (attendees: Attendee[]) => {
  // Transform data to CSV format
  const csvData = attendees.map(attendee => ({
    Name: attendee.name,
    Role: attendee.role,
    Company: attendee.company,
    Type: attendee.type,
    LinkedIn: attendee.linkedIn || ''
  }));

  // Convert to CSV string
  const csv = Papa.unparse(csvData);

  // Create Blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'event-attendees.csv');
};