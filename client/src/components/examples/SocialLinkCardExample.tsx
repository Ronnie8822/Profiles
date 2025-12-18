import SocialLinkCard from "../SocialLinkCard";

export default function SocialLinkCardExample() {
  return (
    <div className="space-y-3 max-w-md">
      <SocialLinkCard
        link={{
          id: "1",
          platform: "instagram",
          url: "https://instagram.com/example",
          label: "Follow me on Instagram",
        }}
      />
      <SocialLinkCard
        link={{
          id: "2",
          platform: "youtube",
          url: "https://youtube.com/@example",
        }}
      />
    </div>
  );
}
