import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  id: string;
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  helperText?: string;
}

export const FileUpload = ({
  id,
  label,
  accept,
  onChange,
  file,
  helperText,
}: FileUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="file" accept={accept} onChange={onChange} required />
      {file && (
        <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
      )}
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};