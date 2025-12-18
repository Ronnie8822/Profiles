import { useState } from "react";

interface ProfileBannerProps {
  topColor: string;
  bottomColor: string;
  bannerImage?: string;
  isEditing?: boolean;
  onImageUpload?: (file: File) => void;
}

export default function ProfileBanner({
  topColor,
  bottomColor,
  bannerImage,
  isEditing = false,
  onImageUpload,
}: ProfileBannerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div
      className="relative h-48 md:h-56 w-full rounded-t-lg overflow-hidden"
      style={{
        background: bannerImage
          ? `url(${bannerImage}) center/cover`
          : `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (isEditing) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      data-testid="profile-banner"
    >
      {bannerImage && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${topColor}40 0%, ${bottomColor}60 100%)`,
          }}
        />
      )}
      {isEditing && (
        <label
          className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all ${
            isDragging ? "bg-black/40" : "bg-black/0 hover:bg-black/20"
          }`}
          data-testid="banner-upload-zone"
        >
          <input
            type="file"
            accept="image/*,.gif"
            className="hidden"
            onChange={handleFileChange}
            data-testid="input-banner-upload"
          />
          <div
            className={`text-white text-center transition-opacity ${
              isDragging ? "opacity-100" : "opacity-0 hover:opacity-100"
            }`}
          >
            <div className="text-lg font-medium">Drop image here</div>
            <div className="text-sm opacity-80">or click to upload</div>
            <div className="text-xs opacity-60 mt-1">Supports GIF, JPG, PNG</div>
          </div>
        </label>
      )}
    </div>
  );
}
