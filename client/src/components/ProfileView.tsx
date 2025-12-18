import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import { SocialLink, SocialPlatform } from "./SocialLinkCard";
import { Volume2, VolumeX, Globe } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/storage";

/* ================= TYPES ================= */

export interface ProfileData {
  username: string;
  name: string;
  tagline: string;
  about: string;
  avatarUrl?: string;
  bannerUrl?: string;
  primaryColor: string;
  accentColor: string;
  gradientFrom?: string;
  gradientTo?: string;
  useGradient?: string;
  fontFamily?: string;
  musicUrl?: string | null;
  links: SocialLink[];
}

interface ProfileViewProps {
  profile?: ProfileData; // optional now
  isPreview?: boolean;
}

/* ================= ICON MAP ================= */

const platformIcons: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  instagram: SiInstagram,
  youtube: SiYoutube,
  facebook: SiFacebook,
  x: SiX,
  telegram: SiTelegram,
  whatsapp: SiWhatsapp,
  discord: SiDiscord,
  spotify: SiSpotify,
  github: SiGithub,
  website: Globe,
};

/* ================= SOCIAL GRID ================= */

function SocialIconGrid({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {links.map((link) => {
        const Icon = platformIcons[link.platform];
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl flex items-center justify-center
                       bg-black/70 backdrop-blur hover:scale-110 transition"
          >
            <Icon className="w-6 h-6 text-white" />
          </a>
        );
      })}
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function ProfileView({
  profile: previewProfile,
  isPreview = false,
}: ProfileViewProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(
    isPreview ? previewProfile ?? null : null
  );

  /* 🔹 LOAD FROM LOCAL STORAGE (REAL VIEW) */
  useEffect(() => {
    if (!isPreview) {
      const saved = getProfile();
      if (saved) setProfile(saved);
    }
  }, [isPreview]);

  /* 🔹 SYNC PREVIEW PROFILE */
  useEffect(() => {
    if (isPreview && previewProfile) {
      setProfile(previewProfile);
    }
  }, [isPreview, previewProfile]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No profile found
      </div>
    );
  }

  const fontFamily = profile.fontFamily || "Inter";
  const mainColor = profile.accentColor || profile.primaryColor;
  const useGradient = profile.useGradient === "true";

  /* ▶ Play music only after enter */
  useEffect(() => {
    if (!entered || !audioRef.current || !profile.musicUrl) return;

    const audio = audioRef.current;
    audio.volume = 0.35;
    audio.muted = false;
    audio.play().catch(() => {});
  }, [entered, profile.musicUrl]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);

    if (!audio.muted) {
      audio.play().catch(() => {});
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily }}
    >
      {/* ================= BACKGROUND ================= */}
      <div
        className="absolute inset-0"
        style={{
          background: profile.bannerUrl
            ? `url(${profile.bannerUrl}) center/cover`
            : useGradient
            ? `linear-gradient(135deg, ${profile.gradientFrom}, ${profile.gradientTo})`
            : profile.primaryColor,
        }}
      />

      {/* ================= CLICK TO ENTER ================= */}
      {!entered && (
        <div
          onClick={() => setEntered(true)}
          className="fixed inset-0 z-[999] cursor-pointer"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: profile.bannerUrl
                ? `url(${profile.bannerUrl})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(14px)",
              transform: "scale(1.15)",
            }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <p
              className="text-white text-xl tracking-wide"
              style={{
                textShadow: "0 0 30px rgba(255,255,255,0.6)",
              }}
            >
              click to enter...
            </p>
          </div>
        </div>
      )}

      {/* ================= AUDIO ================= */}
      {profile.musicUrl && !isPreview && (
        <>
          <audio ref={audioRef} src={profile.musicUrl} loop playsInline />
          {entered && (
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMute}
              style={{
                background: `linear-gradient(135deg, ${mainColor}, #ffffff40)`,
                boxShadow: `0 0 20px ${mainColor}80`,
              }}
              className="fixed top-4 left-4 z-50 rounded-xl backdrop-blur
                         hover:scale-110 transition"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              )}
            </Button>
          )}
        </>
      )}

      {/* ================= PROFILE CONTENT ================= */}
      {entered && (
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-sm w-full">
            <div
              className="rounded-3xl p-6 backdrop-blur-2xl border border-white/20 shadow-2xl"
              style={{ background: `${profile.primaryColor}90` }}
            >
              <div className="flex flex-col items-center">
                <div className="-mt-16 mb-4">
                  <ProfileAvatar
                    imageUrl={profile.avatarUrl}
                    name={profile.name}
                    size="large"
                    borderColor={mainColor}
                  />
                </div>

                <h1
                  className="text-2xl font-bold text-white text-center"
                  style={{
                    textShadow: `
                      0 0 6px ${mainColor},
                      0 0 14px ${mainColor}90,
                      0 0 28px ${mainColor}60
                    `,
                  }}
                >
                  {profile.name}
                </h1>

                <p className="text-white/60 text-sm">@{profile.username}</p>

                {profile.tagline && (
                  <p className="text-white/80 text-sm mt-1 text-center">
                    {profile.tagline}
                  </p>
                )}

                {profile.about && (
                  <p className="text-white/90 text-sm mt-4 text-center whitespace-pre-wrap">
                    {profile.about}
                  </p>
                )}

                {profile.links.length > 0 && (
                  <div className="mt-6">
                    <SocialIconGrid links={profile.links} />
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-white/70 mt-4">
              Thank you for visiting my profile.lol
            </p>
          </div>
        </div>
      )}
    </div>
  );
        }
