import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ProfileView, { ProfileData } from "@/components/ProfileView";
import ThemeToggle from "@/components/ThemeToggle";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3 } from "lucide-react";

const demoProfile: ProfileData = {
  id: "demo",
  username: "romeo",
  name: "Romeo",
  tagline: "Content Creator | Tech Enthusiast | Mumbai",
  about: `Hey there! I'm a passionate content creator and tech enthusiast from Mumbai. I love sharing my journey through social media and connecting with amazing people.

Feel free to connect with me on any platform below!`,
  primaryColor: "#d4c4bc",
  accentColor: "#a8918a",
  links: [
    { id: "1", platform: "instagram", url: "https://instagram.com", label: "Follow on Instagram" },
    { id: "2", platform: "youtube", url: "https://youtube.com", label: "Subscribe on YouTube" },
    { id: "3", platform: "telegram", url: "https://telegram.org", label: "Join Telegram Channel" },
    { id: "4", platform: "whatsapp", url: "https://whatsapp.com", label: "WhatsApp Community" },
    { id: "5", platform: "discord", url: "https://discord.com", label: "Discord Server" },
    { id: "6", platform: "spotify", url: "https://spotify.com", label: "Podcast on Spotify" },
    { id: "7", platform: "github", url: "https://github.com" },
    { id: "8", platform: "x", url: "https://x.com" },
  ],
};

export default function DemoPage() {
  const [, setLocation] = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setLocation("/")}
            data-testid="button-back-demo"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <Button
              onClick={() => setLocation("/edit")}
              className="bg-white/20 backdrop-blur hover:bg-white/30 text-white"
              data-testid="button-create-own"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Create Your Own
            </Button>
          </div>
        </div>
      </header>

      <ProfileView profile={demoProfile} />
      <SimpleFooter />
    </div>
  );
}

