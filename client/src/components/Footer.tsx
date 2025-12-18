import { Link } from "wouter";
import { Sparkles, HeadphonesIcon } from "lucide-react";
import { SiDiscord, SiInstagram, SiX, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const importantLinks = [
    { name: "Home", href: "/" },
    { name: "Demo", href: "/demo" },
    { name: "Create Profile", href: "/edit" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: SiDiscord, href: "https://discord.gg/4PxZqhD27Z", label: "Discord" },
    { icon: SiInstagram, href: "https://www.instagram.com/rommu_uwu", label: "Instagram" },
    { icon: SiX, href: "https://x.com/rommu_uwu", label: "X (Twitter)" },
    { icon: SiGithub, href: "https://github.com/Ronnie8822", label: "GitHub" },
  ];
  
  const supportServerUrl = "https://discord.gg/4PxZqhD27Z";

  return (
    <footer className="bg-background border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                <span className="text-foreground">My</span>
                <span className="text-purple-600 dark:text-purple-400">Profile</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Create beautiful, customizable profile pages with colorful gradients, 
              custom fonts, and all your social links in one place.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover-elevate"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Important Links</h3>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-purple-600 dark:text-purple-400 hover:underline text-sm cursor-pointer"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-purple-600 dark:text-purple-400 hover:underline text-sm cursor-pointer"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Need help? Join our Discord server for support and updates.
            </p>
            <a 
              href={supportServerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                className="bg-[#5865F2] hover:bg-[#4752c4] text-white w-full"
                data-testid="button-support-server"
              >
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Support Server
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} MyProfile. All rights reserved.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
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
              <div className="hidden md:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                {socialLinks.slice(0, 4).map((social) => (
                  <a
                    key={`bottom-${social.label}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                    data-testid={`link-bottom-${social.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
