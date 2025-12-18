import { Textarea } from "@/components/ui/textarea";

interface AboutSectionProps {
  content: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}

export default function AboutSection({
  content,
  isEditing = false,
  onChange,
}: AboutSectionProps) {
  if (isEditing) {
    return (
      <div className="px-6 py-4">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          About Me
        </label>
        <Textarea
          value={content}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Tell visitors about yourself... What do you do? What are your interests? Share your story!"
          className="min-h-48 resize-none text-base leading-relaxed"
          data-testid="input-about"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {content.length}/1000 characters
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-6" data-testid="about-section">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
        About Me
      </h3>
      <p className="text-base leading-relaxed whitespace-pre-wrap">
        {content || "No description yet..."}
      </p>
    </div>
  );
}

