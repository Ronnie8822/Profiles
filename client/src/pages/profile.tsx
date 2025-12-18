import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProfileView, { ProfileData } from "@/components/ProfileView";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const { data: profile, isLoading, error } = useQuery<ProfileData>({
    queryKey: ["/api/profiles", username],
    enabled: !!username,
  });

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #d4c4bc 0%, #a8918a 50%, #d4c4bc 100%)",
        }}
      >
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center gap-4 p-4"
        style={{
          background: "linear-gradient(135deg, #d4c4bc 0%, #a8918a 50%, #d4c4bc 100%)",
        }}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20">
          <h1 className="text-2xl font-bold text-white mb-2" data-testid="text-error-title">Profile Not Found</h1>
          <p className="text-white/70 mb-6" data-testid="text-error-message">
            The profile @{username} doesn't exist yet.
          </p>
          <Link href="/edit">
            <Button
              className="bg-white text-gray-800 hover:bg-white/90"
              data-testid="button-create-own"
            >
              Create Your Own Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <ProfileView profile={profile} />;
}
