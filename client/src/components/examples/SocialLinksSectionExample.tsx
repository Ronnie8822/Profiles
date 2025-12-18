import SocialLinksSection from "../SocialLinksSection";

export default function SocialLinksSectionExample() {
  const mockLinks = [
    { id: "1", platform: "instagram" as const, url: "https://instagram.com/example", label: "Follow on Instagram" },
    { id: "2", platform: "youtube" as const, url: "https://youtube.com/@example" },
    { id: "3", platform: "telegram" as const, url: "https://t.me/example", label: "Join my Telegram" },
  ];

  return (
    <div className="bg-card rounded-lg max-w-md">
      <SocialLinksSection links={mockLinks} />
    </div>
  );
}
