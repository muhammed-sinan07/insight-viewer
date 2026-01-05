import { useState, useCallback } from "react";
import { Upload, FileImage, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && isValidFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const isValidFile = (file: File) => {
    const validExtensions = [".dcm", ".nii", ".nii.gz", ".nifti"];
    const fileName = file.name.toLowerCase();
    return validExtensions.some((ext) => fileName.endsWith(ext)) || 
           file.type.includes("image") ||
           file.name.includes("dicom");
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  return (
    <Card
      className={`relative border-2 border-dashed transition-all duration-300 ${
        isDragging
          ? "border-primary bg-primary/5"
          : selectedFile
          ? "border-primary/50 bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".dcm,.nii,.nii.gz,.nifti,image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="file-upload"
      />

      <div className="p-8 text-center">
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                removeFile();
              }}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">
                Drag & drop your MRI scan
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports DICOM (.dcm) and NIfTI (.nii, .nii.gz) formats
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileImage className="h-4 w-4" />
                <span>DICOM</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <FileImage className="h-4 w-4" />
                <span>NIfTI</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
