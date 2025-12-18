import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, Eye, Copy, Check, Lock, Globe } from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";
import { GradientPicker } from "./AdvancedColorPicker";
import FontSelector from "./FontSelector";
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

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = (updates: Partial<ProfileData>) => {
    onProfileChange({ ...profile, ...updates });
  };

  /* ================= SAVE (LOCAL STORAGE + SLUG) ================= */
  const handleSave = () => {
    if (!profile.username) {
      toast({
        title: "Username required",
        description: "Please enter a username to generate your profile link",
        variant: "destructive",
      });
      return;
    }

    const slug = saveProfile(profile); // 🔥 IMPORTANT

    toast({
      title: "Profile Saved",
      description: `Your profile link is /${slug}`,
    });
  };

  /* ================= COPY LINK ================= */
  const handleCopyLink = async () => {
    if (!profile.username) {
      toast({
        title: "No profile link",
        description: "Save profile first to generate your link",
        variant: "destructive",
      });
      return;
    }

    const url = `${window.location.origin}/${profile.username}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ================= BACKGROUND STYLE ================= */
  const useGradient = profile.useGradient === "true";
  const bgStyle = useGradient
    ? `linear-gradient(135deg, ${profile.gradientFrom}, ${profile.gradientTo})`
    : profile.primaryColor;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* ================= PREVIEW ================= */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-8"
        style={{ background: bgStyle }}
      >
        <div className="w-full max-w-sm bg-white/10 rounded-3xl p-6 text-center text-white">
          <ProfileAvatar
            imageUrl={profile.avatarUrl}
            name={profile.name || "User"}
          />
          <h1 className="mt-3 text-lg font-bold">
            {profile.name || "Your Name"}
          </h1>
          <p className="text-xs opacity-80">{profile.about}</p>
        </div>
      </div>

      {/* ================= EDITOR ================= */}
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
            {/* COLORS */}
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

            {/* FONT */}
            <Card className="p-4">
              <FontSelector
                value={profile.fontFamily || "Inter"}
                onChange={(fontFamily) => updateProfile({ fontFamily })}
              />
            </Card>

            {/* USERNAME */}
            <Card className="p-4">
              <Label>Username</Label>
              <Input
                value={profile.username}
                placeholder="yourname"
                onChange={(e) =>
                  updateProfile({
                    username: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9_]/g, ""),
                  })
                }
              />
            </Card>

            {/* ABOUT */}
            <Card className="p-4">
              <Label>About</Label>
              <Textarea
                value={profile.about}
                onChange={(e) => updateProfile({ about: e.target.value })}
                className="min-h-32"
              />
            </Card>

            {/* SOCIAL LINKS */}
            <Card className="p-4">
              <SocialLinksSection
                links={profile.links}
                isEditing
                onLinksChange={(links) => updateProfile({ links })}
              />
            </Card>

            {/* PRIVACY */}
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

            {/* SHARE LINK */}
            <Card className="p-4">
              <Input
                value={
                  profile.username
                    ? `${window.location.origin}/${profile.username}`
                    : "Save profile to generate link"
                }
                readOnly
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="mt-2"
              >
                {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
    }
