import { Sparkles } from "lucide-react";
import { SiDiscord, SiInstagram, SiX, SiGithub } from "react-icons/si";

export default function SimpleFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: SiDiscord, href: "https://discord.gg/wX32zc6V9", label: "Discord" },
    { icon: SiInstagram, href: "https://instagram.com/rommu_uwu", label: "Instagram" },
    { icon: SiX, href: "https://x.com/rommu_uwu", label: "X" },
    { icon: SiGithub, href: "https://github.com/Ronnie8822", label: "GitHub" },
  ];

  return (
    <footer className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            &copy; {currentYear} MyProfile. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>by</span>
              <a 
                href="https://www.instagram.com/rommu_uwu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                data-testid="link-made-by-romeo"
              >
                Romeo
              </a>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
