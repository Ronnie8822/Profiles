import { Pencil } from "lucide-react";

interface ThemeColorPickerProps {
  primaryColor: string;
  accentColor: string;
  onPrimaryChange: (color: string) => void;
  onAccentChange: (color: string) => void;
}

export default function ThemeColorPicker({
  primaryColor,
  accentColor,
  onPrimaryChange,
  onAccentChange,
}: ThemeColorPickerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Profile Theme
      </h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="relative block cursor-pointer">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              data-testid="color-picker-primary"
            />
            <div
              className="h-20 rounded-xl flex items-end justify-end p-3 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: primaryColor }}
            >
              <Pencil className="w-5 h-5 text-black/50" />
            </div>
            <p className="text-center text-sm mt-2 text-muted-foreground">Primary</p>
          </label>
        </div>
        <div className="flex-1">
          <label className="relative block cursor-pointer">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => onAccentChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              data-testid="color-picker-accent"
            />
            <div
              className="h-20 rounded-xl flex items-end justify-end p-3 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: accentColor }}
            >
              <Pencil className="w-5 h-5 text-black/50" />
            </div>
            <p className="text-center text-sm mt-2 text-muted-foreground">Accent</p>
          </label>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Themes</h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            { primary: "#d4c4bc", accent: "#a8918a" },
            { primary: "#b8c5d6", accent: "#8fa3b8" },
            { primary: "#c9d6c4", accent: "#9bb08f" },
            { primary: "#e8d4d4", accent: "#c9a8a8" },
            { primary: "#d6c9e8", accent: "#b8a3c9" },
            { primary: "#d4e8e8", accent: "#a8c9c9" },
            { primary: "#e8e4d4", accent: "#c9c4a8" },
            { primary: "#f0e6e6", accent: "#d9c9c9" },
          ].map((theme, i) => (
            <button
              key={i}
              className="h-10 rounded-lg overflow-hidden border border-border hover:ring-2 hover:ring-primary/50 transition-all"
              onClick={() => {
                onPrimaryChange(theme.primary);
                onAccentChange(theme.accent);
              }}
              data-testid={`button-quick-theme-${i}`}
            >
              <div className="h-full flex">
                <div className="flex-1" style={{ backgroundColor: theme.primary }} />
                <div className="flex-1" style={{ backgroundColor: theme.accent }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
