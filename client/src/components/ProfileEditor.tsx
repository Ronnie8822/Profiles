import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, Eye, X, Share2, Copy, Check, Link as LinkIcon, Lock, Globe, Music, Upload } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import { GradientPicker } from "./AdvancedColorPicker";
import FontSelector from "./FontSelector";
import BannerUpload from "./BannerUpload";
import SocialLinksSection from "./SocialLinksSection";
import { ProfileData } from "./ProfileView";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditorProps {
  profile: ProfileData;
  onProfileChange: (profile: ProfileData) => void;
  onSave: () => Promise<void> | void;
  onPreview: () => void;
  isSaving?: boolean;
}

export default function ProfileEditor({
  profile,
  onProfileChange,
  onSave,
  onPreview,
  isSaving = false,
}: ProfileEditorProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const updateProfile = (updates: Partial<ProfileData>) => {
    onProfileChange({ ...profile, ...updates });
  };

  const handlePublish = async () => {
    if (!profile.id || profile.id === "new") {
      toast({
        title: "Save First",
        description: "Please save your profile before publishing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await apiRequest("POST", `/api/profiles/${profile.id}/publish`);
      const data = await res.json();
      onProfileChange({ ...profile, shareSlug: data.shareSlug, isPublished: "true" });
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      toast({
        title: "Profile Published!",
        description: "Your profile is now live and ready to share.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to publish profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [isPublishing, setIsPublishing] = useState(false);
  
  const publishProfile = async () => {
    setIsPublishing(true);
    await handlePublish();
    setIsPublishing(false);
  };

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB max for GIF support

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const validateAndConvertImage = async (file: File): Promise<string | null> => {
    if (file.size > MAX_IMAGE_SIZE) {
      toast({
        title: "Image too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return null;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file (JPG, PNG, GIF)",
        variant: "destructive",
      });
      return null;
    }

    return await convertToBase64(file);
  };

  const handleBannerUpload = async (file: File) => {
    try {
      const base64 = await validateAndConvertImage(file);
      if (base64) {
        updateProfile({ bannerUrl: base64 });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload banner image",
        variant: "destructive",
      });
    }
  };

  const MAX_AUDIO_SIZE = 15 * 1024 * 1024; // 15MB max for audio

  const handleMusicUpload = async (file: File) => {
    try {
      if (file.size > MAX_AUDIO_SIZE) {
        toast({
          title: "File too large",
          description: "Please upload an audio file smaller than 15MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Invalid file",
          description: "Please upload an audio file (MP3, WAV, OGG)",
          variant: "destructive",
        });
        return;
      }

      const base64 = await convertToBase64(file);
      updateProfile({ musicUrl: base64 });
      toast({
        title: "Music uploaded",
        description: "Your background music has been added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload music file",
        variant: "destructive",
      });
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const base64 = await validateAndConvertImage(file);
      if (base64) {
        updateProfile({ avatarUrl: base64 });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload avatar image",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/share/${profile.shareSlug}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useGradient = profile.useGradient === "true";
  const gradientFrom = profile.gradientFrom || profile.primaryColor;
  const gradientTo = profile.gradientTo || profile.accentColor;
  
  const backgroundStyle = useGradient
    ? `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 50%, ${gradientFrom} 100%)`
    : gradientFrom;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="hidden lg:block lg:w-1/2 sticky top-0 h-screen overflow-hidden">
        <div
          className="h-full flex items-center justify-center p-8"
          style={{ background: backgroundStyle }}
        >
          <div className="w-full max-w-sm">
            <div 
              className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              style={{ fontFamily: profile.fontFamily || "Inter" }}
            >
              {profile.bannerUrl && (
                <div className="h-24 w-full overflow-hidden">
                  <img
                    src={profile.bannerUrl}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`flex flex-col items-center ${profile.bannerUrl ? "-mt-10" : "pt-6"}`}>
                <ProfileAvatar
                  imageUrl={profile.avatarUrl}
                  name={profile.name || profile.username || "User"}
                  size="medium"
                  borderColor={gradientTo}
                />
              </div>
              <div className="text-center px-4 pt-3 pb-4">
                <h1 className="text-lg font-bold text-white">
                  {profile.name || "Your Name"}
                </h1>
                {profile.tagline && (
                  <p className="text-white/70 text-xs mt-1">{profile.tagline}</p>
                )}
                {profile.about && (
                  <p className="text-white/80 text-xs mt-3 line-clamp-2">{profile.about}</p>
                )}
                {profile.links.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {profile.links.slice(0, 3).map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center gap-2 p-2 bg-white/20 rounded-lg text-xs text-white"
                      >
                        <div className="w-4 h-4 rounded bg-white/30" />
                        <span>{link.label || link.platform}</span>
                      </div>
                    ))}
                    {profile.links.length > 3 && (
                      <p className="text-white/50 text-xs">
                        +{profile.links.length - 3} more links
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-xs text-white/40 mt-4">Live Preview</p>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:w-1/2 flex flex-col bg-background">
        <div className="flex items-center justify-between gap-2 p-4 border-b border-border bg-background sticky top-0 z-10">
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <div className="flex gap-2 flex-wrap justify-end">
            <Button
              variant="outline"
              onClick={onPreview}
              className="lg:hidden"
              data-testid="button-preview"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={onSave} disabled={isSaving} data-testid="button-save">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6 pb-24">
            {profile.isPublished === "true" && profile.shareSlug && (
              <Card className="p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      Profile Published
                    </h3>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Your profile is live and ready to share
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={`${window.location.origin}/share/${profile.shareSlug}`}
                    readOnly
                    className="text-sm bg-white/50 dark:bg-black/30"
                    data-testid="input-share-url"
                  />
                  <Button
                    variant="outline"
                    onClick={handleCopyLink}
                    className="shrink-0"
                    data-testid="button-copy-url"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>
            )}

            {profile.id !== "new" && profile.isPublished !== "true" && (
              <Card className="p-5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/30">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-semibold">Ready to Share?</h3>
                    <p className="text-sm text-muted-foreground">
                      Publish your profile to get a shareable link
                    </p>
                  </div>
                  <Button
                    onClick={publishProfile}
                    disabled={isPublishing || isSaving || profile.id === "new"}
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                    data-testid="button-publish"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {isPublishing ? "Publishing..." : "Publish Profile"}
                  </Button>
                </div>
              </Card>
            )}

            {profile.id === "new" && (
              <Card className="p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200">Save First</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill in your details and save your profile to get a shareable link
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Background Style
              </h3>
              <GradientPicker
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
                useGradient={useGradient}
                onGradientFromChange={(color) => {
                  updateProfile({ gradientFrom: color, primaryColor: color });
                }}
                onGradientToChange={(color) => {
                  updateProfile({ gradientTo: color, accentColor: color });
                }}
                onUseGradientChange={(use) => {
                  updateProfile({ useGradient: use ? "true" : "false" });
                }}
              />
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Typography
              </h3>
              <FontSelector
                value={profile.fontFamily || "Inter"}
                onChange={(fontFamily) => updateProfile({ fontFamily })}
              />
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Profile Picture
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <ProfileAvatar
                  imageUrl={profile.avatarUrl}
                  name={profile.name || profile.username || "User"}
                  isEditing
                  onImageUpload={handleAvatarUpload}
                  borderColor={gradientTo}
                />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Click to upload photo</p>
                  <p className="text-xs">Supports JPG, PNG, GIF</p>
                  {profile.avatarUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateProfile({ avatarUrl: undefined })}
                      className="text-destructive p-0 h-auto"
                      data-testid="button-remove-avatar"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <BannerUpload
                bannerUrl={profile.bannerUrl}
                onUpload={handleBannerUpload}
                onRemove={() => updateProfile({ bannerUrl: undefined })}
              />
            </Card>

            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Profile Info
              </h3>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Username</label>
                <Input
                  value={profile.username}
                  onChange={(e) => updateProfile({ username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                  placeholder="username"
                  data-testid="input-username"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Only letters, numbers, and underscores
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Display Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  placeholder="Your name"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tagline</label>
                <Input
                  value={profile.tagline}
                  onChange={(e) => updateProfile({ tagline: e.target.value })}
                  placeholder="A short bio or tagline"
                  data-testid="input-tagline"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">About Me</label>
                <Textarea
                  value={profile.about}
                  onChange={(e) => updateProfile({ about: e.target.value })}
                  placeholder="Tell visitors about yourself... Share your story, interests, and what makes you unique!"
                  className="min-h-48 resize-none"
                  data-testid="input-about"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  {profile.about.length}/1000 characters
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <SocialLinksSection
                links={profile.links}
                isEditing
                onLinksChange={(links) => updateProfile({ links })}
              />
            </Card>

            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Background Music
                </h3>
                {profile.musicUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateProfile({ musicUrl: undefined })}
                    className="text-destructive"
                    data-testid="button-remove-music"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              
              {profile.musicUrl ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Music className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Music Added</p>
                      <p className="text-xs text-muted-foreground">Audio will play on your profile</p>
                    </div>
                  </div>
                  <audio controls className="w-full" src={profile.musicUrl} data-testid="audio-preview">
                    Your browser does not support audio.
                  </audio>
                  <label className="flex items-center justify-center gap-2 p-2 border border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleMusicUpload(file);
                      }}
                      data-testid="input-change-music"
                    />
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Change Music</span>
                  </label>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-xl cursor-pointer transition-colors border-border hover:border-primary/50"
                  data-testid="music-upload-zone"
                >
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleMusicUpload(file);
                    }}
                    data-testid="input-music-file"
                  />
                  <Music className="w-6 h-6 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload Music File</span>
                  <span className="text-xs text-muted-foreground mt-1">MP3, WAV, OGG (max 15MB)</span>
                </label>
              )}
            </Card>

            <Card className="p-5 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Privacy Settings
              </h3>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {profile.isPrivate ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Globe className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <Label htmlFor="privacy-toggle" className="text-sm font-medium">
                      Private Profile
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {profile.isPrivate 
                        ? "Only logged-in users can view your profile" 
                        : "Anyone can view your profile"}
                    </p>
                  </div>
                </div>
                <Switch
                  id="privacy-toggle"
                  checked={profile.isPrivate || false}
                  onCheckedChange={(checked) => updateProfile({ isPrivate: checked })}
                  data-testid="switch-privacy"
                />
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
