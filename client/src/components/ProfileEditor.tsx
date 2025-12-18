import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Save,
  Eye,
  X,
  Copy,
  Check,
  Link as LinkIcon,
  Lock,
  Globe,
  Music,
  Upload,
} from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";
import { GradientPicker } from "./AdvancedColorPicker";
import FontSelector from "./FontSelector";
import BannerUpload from "./BannerUpload";
import SocialLinksSection from "./SocialLinksSection";
import { ProfileData } from "./ProfileView";
import { saveProfile } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditorProps {
  profile: ProfileData;
  onProfileChange: (profile: ProfileData) => void;
  onPreview: () => void;
}

export default function ProfileEditor({
  profile,
  onProfileChange,
  onPreview,
}: ProfileEditorProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const updateProfile = (updates: Partial<ProfileData>) => {
    onProfileChange({ ...profile, ...updates });
  };

  /* ---------------- SAVE (LOCAL STORAGE) ---------------- */
  const handleSave = () => {
    saveProfile(profile);
    toast({
      title: "Profile Saved",
      description: "Your profile is saved locally on this device.",
    });
  };

  /* ---------------- FILE HELPERS ---------------- */
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
  const MAX_AUDIO_SIZE = 15 * 1024 * 1024;

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleImageUpload = async (
    file: File,
    key: "avatarUrl" | "bannerUrl"
  ) => {
    if (file.size > MAX_IMAGE_SIZE || !file.type.startsWith("image/")) {
      toast({
        title: "Invalid image",
        description: "Upload JPG / PNG / GIF under 10MB",
        variant: "destructive",
      });
      return;
    }
    updateProfile({ [key]: await toBase64(file) });
  };

  const handleMusicUpload = async (file: File) => {
    if (file.size > MAX_AUDIO_SIZE || !file.type.startsWith("audio/")) {
      toast({
        title: "Invalid audio",
        description: "Upload MP3 / WAV / OGG under 15MB",
        variant: "destructive",
      });
      return;
    }
    updateProfile({ musicUrl: await toBase64(file) });
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/profile`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useGradient = profile.useGradient === "true";
  const bgStyle = useGradient
    ? `linear-gradient(135deg, ${profile.gradientFrom}, ${profile.gradientTo})`
    : profile.primaryColor;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* PREVIEW */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8" style={{ background: bgStyle }}>
        <div className="w-full max-w-sm bg-white/10 rounded-3xl p-6 text-center text-white">
          <ProfileAvatar
            imageUrl={profile.avatarUrl}
            name={profile.name || "User"}
          />
          <h1 className="mt-3 text-lg font-bold">{profile.name || "Your Name"}</h1>
          <p className="text-xs opacity-80">{profile.about}</p>
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1 bg-background">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4 space-y-6">
            <Card className="p-4">
              <GradientPicker
                gradientFrom={profile.gradientFrom}
                gradientTo={profile.gradientTo}
                useGradient={useGradient}
                onGradientFromChange={(c) =>
                  updateProfile({ gradientFrom: c, primaryColor: c })
                }
                onGradientToChange={(c) =>
                  updateProfile({ gradientTo: c, accentColor: c })
                }
                onUseGradientChange={(v) =>
                  updateProfile({ useGradient: v ? "true" : "false" })
                }
              />
            </Card>

            <Card className="p-4">
              <FontSelector
                value={profile.fontFamily || "Inter"}
                onChange={(fontFamily) => updateProfile({ fontFamily })}
              />
            </Card>

            <Card className="p-4">
              <label className="block mb-1">Username</label>
              <Input
                value={profile.username}
                onChange={(e) =>
                  updateProfile({
                    username: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9_]/g, ""),
                  })
                }
              />
            </Card>

            <Card className="p-4">
              <label className="block mb-1">About</label>
              <Textarea
                value={profile.about}
                onChange={(e) => updateProfile({ about: e.target.value })}
                className="min-h-32"
              />
            </Card>

            <Card className="p-4">
              <SocialLinksSection
                links={profile.links}
                isEditing
                onLinksChange={(links) => updateProfile({ links })}
              />
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {profile.isPrivate ? <Lock /> : <Globe />}
                  <Label>Private Profile</Label>
                </div>
                <Switch
                  checked={profile.isPrivate || false}
                  onCheckedChange={(v) => updateProfile({ isPrivate: v })}
                />
              </div>
            </Card>

            <Card className="p-4">
              <Input value={`${window.location.origin}/profile`} readOnly />
              <Button onClick={handleCopyLink} variant="outline" className="mt-2">
                {copied ? <Check /> : <Copy />} Copy Link
              </Button>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
              }
