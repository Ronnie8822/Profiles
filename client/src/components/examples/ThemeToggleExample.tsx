import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

export default function ThemeToggleExample() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
      <span className="text-sm">Theme: {isDark ? "Dark" : "Light"}</span>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
    </div>
  );
}
