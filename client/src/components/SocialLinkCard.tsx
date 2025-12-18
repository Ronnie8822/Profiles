import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Trash2, GripVertical } from "lucide-react";
import {
  SiInstagram,
  SiYoutube,
  SiFacebook,
  SiX,
  SiTelegram,
  SiWhatsapp,
  SiDiscord,
  SiSpotify,
  SiGithub,
} from "react-icons/si";
import { Globe } from "lucide-react";

export type SocialPlatform =
  | "instagram"
  | "youtube"
  | "facebook"
  | "x"
  | "telegram"
  | "whatsapp"
  | "discord"
  | "spotify"
  | "github"
  | "website";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label?: string;
}

const platformConfig: Record<
  SocialPlatform,
  { icon: React.ComponentType<{ className?: string }>; name: string; color: string }
> = {
  instagram: { icon: SiInstagram, name: "Instagram", color: "#E4405F" },
  youtube: { icon: SiYoutube, name: "YouTube", color: "#FF0000" },
  facebook: { icon: SiFacebook, name: "Facebook", color: "#1877F2" },
  x: { icon: SiX, name: "X (Twitter)", color: "#000000" },
  telegram: { icon: SiTelegram, name: "Telegram", color: "#26A5E4" },
  whatsapp: { icon: SiWhatsapp, name: "WhatsApp", color: "#25D366" },
  discord: { icon: SiDiscord, name: "Discord", color: "#5865F2" },
  spotify: { icon: SiSpotify, name: "Spotify", color: "#1DB954" },
  github: { icon: SiGithub, name: "GitHub", color: "#181717" },
  website: { icon: Globe, name: "Website", color: "#6366F1" },
};

interface SocialLinkCardProps {
  link: SocialLink;
  isEditing?: boolean;
  onUrlChange?: (url: string) => void;
  onLabelChange?: (label: string) => void;
  onDelete?: () => void;
}

export default function SocialLinkCard({
  link,
  isEditing = false,
  onUrlChange,
  onLabelChange,
  onDelete,
}: SocialLinkCardProps) {
  const config = platformConfig[link.platform];
  const Icon = config.icon;

  if (isEditing) {
    return (
      <div
        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg group"
        data-testid={`social-link-edit-${link.id}`}
      >
        <div className="cursor-grab opacity-50 group-hover:opacity-100">
          <GripVertical className="w-4 h-4" />
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: config.color }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={link.label || config.name}
            onChange={(e) => onLabelChange?.(e.target.value)}
            placeholder="Label"
            className="h-8 text-sm"
            data-testid={`input-link-label-${link.id}`}
          />
          <Input
            value={link.url}
            onChange={(e) => onUrlChange?.(e.target.value)}
            placeholder={`Enter ${config.name} URL`}
            className="h-8 text-sm"
            data-testid={`input-link-url-${link.id}`}
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
          className="text-destructive shrink-0"
          data-testid={`button-delete-link-${link.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover-elevate active-elevate-2 transition-transform"
      data-testid={`social-link-${link.id}`}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: config.color }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="flex-1 font-medium text-lg">
        {link.label || config.name}
      </span>
      <ExternalLink className="w-5 h-5 text-muted-foreground" />
    </a>
  );
}
