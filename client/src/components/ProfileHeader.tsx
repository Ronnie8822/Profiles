import { Input } from "@/components/ui/input";

interface ProfileHeaderProps {
  name: string;
  tagline: string;
  isEditing?: boolean;
  onNameChange?: (name: string) => void;
  onTaglineChange?: (tagline: string) => void;
}

export default function ProfileHeader({
  name,
  tagline,
  isEditing = false,
  onNameChange,
  onTaglineChange,
}: ProfileHeaderProps) {
  if (isEditing) {
    return (
      <div className="px-6 pt-4 space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Display Name
          </label>
          <Input
            value={name}
            onChange={(e) => onNameChange?.(e.target.value)}
            placeholder="Your name"
            className="text-xl font-semibold"
            data-testid="input-name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Tagline
          </label>
          <Input
            value={tagline}
            onChange={(e) => onTaglineChange?.(e.target.value)}
            placeholder="A short bio or tagline"
            data-testid="input-tagline"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-4" data-testid="profile-header">
      <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-name">
        {name || "Your Name"}
      </h1>
      {tagline && (
        <p className="text-lg text-muted-foreground mt-1" data-testid="text-tagline">
          {tagline}
        </p>
      )}
    </div>
  );
}
