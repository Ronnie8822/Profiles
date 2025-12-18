import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  imageUrl?: string;
  name: string;
  isEditing?: boolean;
  onImageUpload?: (file: File) => void;
  size?: "small" | "medium" | "large";
  borderColor?: string;
}

export default function ProfileAvatar({
  imageUrl,
  name,
  isEditing = false,
  onImageUpload,
  size = "medium",
  borderColor = "#ffffff",
}: ProfileAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-28 h-28",
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        className={`${sizeClasses[size]} border-4 shadow-xl`}
        style={{ borderColor }}
        data-testid="profile-avatar"
      >
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={name} className="object-cover" />
        ) : (
          <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-primary to-accent text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      {isEditing && (
        <label
          className={`absolute inset-0 flex items-center justify-center rounded-full cursor-pointer transition-opacity bg-black/50 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
        >
          <input
            type="file"
            accept="image/*,.gif"
            className="hidden"
            onChange={handleFileChange}
            data-testid="input-avatar-upload"
          />
          <Camera className="w-8 h-8 text-white" />
        </label>
      )}
    </div>
  );
}
