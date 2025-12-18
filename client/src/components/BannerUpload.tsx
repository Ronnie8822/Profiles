import { useState } from "react";
import { Image, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerUploadProps {
  bannerUrl?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export default function BannerUpload({ bannerUrl, onUpload, onRemove }: BannerUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Banner Image
        </h3>
        {bannerUrl && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive"
            data-testid="button-remove-banner"
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        )}
      </div>
      
      {bannerUrl ? (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={bannerUrl}
            alt="Banner preview"
            className="w-full h-32 object-cover"
            data-testid="banner-preview"
          />
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <input
              type="file"
              accept="image/*,.gif"
              className="hidden"
              onChange={handleFileChange}
              data-testid="input-change-banner"
            />
            <div className="text-white text-center">
              <Upload className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Change Image</span>
            </div>
          </label>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          data-testid="banner-upload-zone"
        >
          <input
            type="file"
            accept="image/*,.gif"
            className="hidden"
            onChange={handleFileChange}
            data-testid="input-banner-upload"
          />
          <Image className="w-8 h-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">
            Drag & drop or click to upload
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            Supports JPG, PNG, GIF
          </span>
        </label>
      )}
    </div>
  );
}
