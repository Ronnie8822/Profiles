import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import SocialLinkCard, { SocialLink, SocialPlatform } from "./SocialLinkCard";
import { useState } from "react";

interface SocialLinksSectionProps {
  links: SocialLink[];
  isEditing?: boolean;
  onLinksChange?: (links: SocialLink[]) => void;
}

const availablePlatforms: { value: SocialPlatform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "x", label: "X (Twitter)" },
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "discord", label: "Discord" },
  { value: "spotify", label: "Spotify" },
  { value: "github", label: "GitHub" },
  { value: "website", label: "Website" },
];

export default function SocialLinksSection({
  links,
  isEditing = false,
  onLinksChange,
}: SocialLinksSectionProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | "">("");

  const handleAddLink = () => {
    if (!selectedPlatform || !onLinksChange) return;
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: selectedPlatform,
      url: "",
    };
    onLinksChange([...links, newLink]);
    setSelectedPlatform("");
  };

  const handleUpdateLink = (id: string, updates: Partial<SocialLink>) => {
    if (!onLinksChange) return;
    onLinksChange(
      links.map((link) => (link.id === id ? { ...link, ...updates } : link))
    );
  };

  const handleDeleteLink = (id: string) => {
    if (!onLinksChange) return;
    onLinksChange(links.filter((link) => link.id !== id));
  };

  if (isEditing) {
    return (
      <div className="px-6 py-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            Social Links
          </label>
        </div>
        <div className="flex gap-2">
          <Select
            value={selectedPlatform}
            onValueChange={(value) => setSelectedPlatform(value as SocialPlatform)}
          >
            <SelectTrigger className="flex-1" data-testid="select-platform">
              <SelectValue placeholder="Choose platform" />
            </SelectTrigger>
            <SelectContent>
              {availablePlatforms.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddLink}
            disabled={!selectedPlatform}
            data-testid="button-add-link"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {links.map((link) => (
            <SocialLinkCard
              key={link.id}
              link={link}
              isEditing
              onUrlChange={(url) => handleUpdateLink(link.id, { url })}
              onLabelChange={(label) => handleUpdateLink(link.id, { label })}
              onDelete={() => handleDeleteLink(link.id)}
            />
          ))}
        </div>
        {links.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No social links added yet. Choose a platform and click Add.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="px-6 py-4 space-y-3" data-testid="social-links-section">
      {links.map((link) => (
        <SocialLinkCard key={link.id} link={link} />
      ))}
      {links.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No social links added yet.
        </p>
      )}
    </div>
  );
}
