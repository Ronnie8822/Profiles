import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProfileEditor from "@/components/ProfileEditor";
import ProfileView, { ProfileData } from "@/components/ProfileView";
import ThemeToggle from "@/components/ThemeToggle";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const STORAGE_KEY = "myprofile_draft";

const defaultProfile: ProfileData = {
  id: "new",
  username: "",
  name: "",
  tagline: "",
  about: "",
  primaryColor: "#7c3aed",
  accentColor: "#c084fc",
  gradientFrom: "#7c3aed",
  gradientTo: "#c084fc",
  useGradient: "true",
  fontFamily: "Inter",
  links: [],
};

function loadDraft(): ProfileData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.topColor) {
        parsed.primaryColor = parsed.topColor;
        parsed.accentColor = parsed.bottomColor;
        delete parsed.topColor;
        delete parsed.bottomColor;
      }
      return { ...defaultProfile, ...parsed };
    }
  } catch {
    // Ignore parse errors
  }
  return defaultProfile;
}

export default function EditPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [showPreview, setShowPreview] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { data: existingProfile, isLoading: profileLoading } = useQuery<ProfileData | null>({
    queryKey: ["/api/my-profile"],
    enabled: true,
  });

  useEffect(() => {
    if (!initialized && !profileLoading) {
      if (existingProfile) {
        setProfile(existingProfile);
        try {
          const { avatarUrl, bannerUrl, ...profileWithoutImages } = existingProfile;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(profileWithoutImages));
        } catch {
          // Handle quota exceeded error silently
        }
      } else {
        const draft = loadDraft();
        setProfile(draft);
      }
      setInitialized(true);
    }
  }, [existingProfile, profileLoading, initialized]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (initialized) {
      try {
        // Exclude image data from draft storage to prevent quota issues
        const { avatarUrl, bannerUrl, ...draftWithoutImages } = profile;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draftWithoutImages));
      } catch (error) {
        // Handle quota exceeded error silently - images won't be persisted in draft
        console.warn("Could not save draft to localStorage");
      }
    }
  }, [profile, initialized]);

  const handleSave = useCallback(async () => {
    if (!profile.username || !profile.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in your username and display name.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      let result: ProfileData;

      if (profile.id === "new") {
        const { id, ...createData } = profile;
        const res = await apiRequest("POST", "/api/profiles", createData);
        result = await res.json();
      } else {
        const { id, ...updateData } = profile;
        const res = await apiRequest("PATCH", `/api/profiles/${id}`, updateData);
        result = await res.json();
      }

      setProfile(result);
      try {
        const { avatarUrl, bannerUrl, ...resultWithoutImages } = result;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resultWithoutImages));
      } catch {
        // Handle quota exceeded error silently
      }
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/my-profile"] });
      
      toast({
        title: profile.id === "new" ? "Profile Created!" : "Profile Saved!",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [profile, toast]);

  if (profileLoading || !initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <span className="text-white/70">Loading your profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="lg:hidden sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex items-center justify-between gap-2 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-purple-500" />
            <span className="font-bold">MyProfile</span>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      <div className="hidden lg:flex items-center justify-between gap-4 px-6 h-14 border-b border-border bg-background sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            data-testid="button-back-desktop"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold">MyProfile Editor</span>
          </div>
        </div>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </div>

      <ProfileEditor
        profile={profile}
        onProfileChange={setProfile}
        onSave={handleSave}
        onPreview={() => setShowPreview(true)}
        isSaving={isSaving}
      />

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md p-0 overflow-hidden max-h-[90vh] overflow-y-auto border-0" aria-describedby={undefined}>
          <VisuallyHidden>
            <DialogTitle>Profile Preview</DialogTitle>
          </VisuallyHidden>
          <ProfileView profile={profile} isPreview />
        </DialogContent>
      </Dialog>

      <SimpleFooter />
    </div>
  );
}
