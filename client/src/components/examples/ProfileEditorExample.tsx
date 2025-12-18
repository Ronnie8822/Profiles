import { useState } from "react";
import ProfileEditor from "../ProfileEditor";
import { ProfileData } from "../ProfileView";

const initialProfile: ProfileData = {
  id: "1",
  username: "rahulkumar",
  name: "Rahul Kumar",
  tagline: "Content Creator | Tech Enthusiast",
  about: "Hey there! I'm a passionate content creator from Mumbai.",
  primaryColor: "#d4c4bc",
  accentColor: "#a8918a",
  links: [
    { id: "1", platform: "instagram", url: "https://instagram.com/rahulkumar" },
    { id: "2", platform: "youtube", url: "https://youtube.com/@rahulkumar" },
  ],
};

export default function ProfileEditorExample() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);

  return (
    <div className="h-screen">
      <ProfileEditor
        profile={profile}
        onProfileChange={setProfile}
        onSave={() => console.log("Saving profile:", profile)}
        onPreview={() => console.log("Preview clicked")}
      />
    </div>
  );
}
