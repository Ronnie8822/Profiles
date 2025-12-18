import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { Sparkles, Edit3, Palette, Link2, Share2, Type, Wand2, Music } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const features = [
    {
      icon: Palette,
      title: "Custom Colors",
      description: "Beautiful gradients with color wheel and hex code support",
    },
    {
      icon: Type,
      title: "Font Styles",
      description: "Choose from handwriting, serif, sans-serif and more",
    },
    {
      icon: Link2,
      title: "Social Links",
      description: "Instagram, YouTube, Discord, Telegram & 10+ platforms",
    },
    {
      icon: Share2,
      title: "Shareable URL",
      description: "Get your unique link to share everywhere",
    },
    {
      icon: Music,
      title: "Background Music",
      description: "Add your favorite music to play on your profile",
    },
    {
      icon: Wand2,
      title: "Easy Customization",
      description: "Real-time preview as you design your profile",
    },
  ];

  const steps = [
    { num: "01", title: "Create", desc: "Add your name, bio & links" },
    { num: "02", title: "Customize", desc: "Pick colors, fonts & style" },
    { num: "03", title: "Share", desc: "Get your unique profile URL" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 dark:from-violet-900 dark:via-purple-900 dark:to-indigo-950 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">MyProfile</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <Link href="/edit">
              <Button
                className="bg-white text-purple-700 font-semibold"
                data-testid="button-header-create"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Create
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 md:py-32 flex-1">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/90">
                <Wand2 className="w-4 h-4" />
                Free Forever
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg">
                Your Profile,
                <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Your Style
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
                Create a beautiful, customizable profile page with colorful gradients, 
                custom fonts, background music, and all your social links in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/edit">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-purple-700 font-semibold shadow-xl shadow-purple-900/30"
                    data-testid="button-create-profile"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Your Profile
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-white/10 backdrop-blur border-white/30 text-white font-semibold"
                    data-testid="button-view-demo"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-[40px] blur-2xl opacity-40 animate-pulse" />
                <div className="relative w-80 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                  <div className="h-28 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
                  <div className="-mt-12 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-4 border-white/50 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                      R
                    </div>
                  </div>
                  <div className="text-center px-6 pt-4 pb-6">
                    <h3 className="text-xl font-bold text-white">Romeo</h3>
                    <p className="text-white/70 text-sm mt-1">Content Creator & Developer</p>
                    <p className="text-white/60 text-xs mt-3 leading-relaxed">
                      Building cool stuff on the internet. Love coding, gaming, and making videos!
                    </p>
                    <div className="mt-5 space-y-2.5">
                      {[
                        { name: "Instagram", color: "from-pink-500 to-rose-500" },
                        { name: "YouTube", color: "from-red-500 to-orange-500" },
                        { name: "Discord", color: "from-indigo-500 to-purple-500" },
                      ].map((link, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 p-3 bg-gradient-to-r ${link.color} rounded-xl text-sm text-white font-medium shadow-lg`}
                        >
                          <div className="w-6 h-6 rounded-lg bg-white/30 flex items-center justify-center">
                            <div className="w-3 h-3 rounded bg-white/70" />
                          </div>
                          <span>{link.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Create your profile in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <Card
                  className="relative p-8 bg-white/10 backdrop-blur border-white/20 text-center h-full"
                  data-testid={`card-step-${i}`}
                >
                  <div className="text-5xl font-bold text-white/20 mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70">{step.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Powerful Features
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Everything you need to create the perfect profile
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="p-6 bg-white/10 backdrop-blur border-white/20 group"
                data-testid={`card-feature-${i}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Create Your Profile?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Join thousands of creators using MyProfile to share their links beautifully
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/edit">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 font-semibold shadow-xl"
                  data-testid="button-start-create"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
