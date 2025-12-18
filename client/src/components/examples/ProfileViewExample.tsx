import ProfileView, { ProfileData } from "../ProfileView";

const mockProfile: ProfileData = {
  id: "1",
  username: "rahulkumar",
  name: "Rahul Kumar",
  tagline: "Content Creator | Tech Enthusiast",
  about: "Hey there! I'm a passionate content creator and tech enthusiast from Mumbai. I love sharing my journey through social media.",
  primaryColor: "#d4c4bc",
  accentColor: "#a8918a",
  links: [
    { id: "1", platform: "instagram", url: "https://instagram.com/rahulkumar", label: "Follow on Instagram" },
    { id: "2", platform: "youtube", url: "https://youtube.com/@rahulkumar", label: "Subscribe on YouTube" },
    { id: "3", platform: "telegram", url: "https://t.me/rahulkumar", label: "Join Telegram" },
    { id: "4", platform: "github", url: "https://github.com/rahulkumar" },
  ],
};

export default function ProfileViewExample() {
  return <ProfileView profile={mockProfile} isPreview />;
}
