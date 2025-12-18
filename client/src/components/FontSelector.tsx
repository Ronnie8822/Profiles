import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

const fontOptions = [
  { value: "Inter", label: "Inter", category: "Sans-serif", preview: "The quick brown fox" },
  { value: "DM Sans", label: "DM Sans", category: "Sans-serif", preview: "The quick brown fox" },
  { value: "Poppins", label: "Poppins", category: "Sans-serif", preview: "The quick brown fox" },
  { value: "Georgia", label: "Georgia", category: "Serif", preview: "The quick brown fox" },
  { value: "Playfair Display", label: "Playfair Display", category: "Serif", preview: "The quick brown fox" },
  { value: "Merriweather", label: "Merriweather", category: "Serif", preview: "The quick brown fox" },
  { value: "Dancing Script", label: "Dancing Script", category: "Script", preview: "The quick brown fox" },
  { value: "Caveat", label: "Caveat", category: "Handwritten", preview: "The quick brown fox" },
  { value: "Roboto Mono", label: "Roboto Mono", category: "Monospace", preview: "The quick brown fox" },
  { value: "Fira Code", label: "Fira Code", category: "Monospace", preview: "The quick brown fox" },
];

export default function FontSelector({ value, onChange }: FontSelectorProps) {
  const currentFont = fontOptions.find(f => f.value === value) || fontOptions[0];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Font Style</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            data-testid="button-font-selector"
          >
            <Type className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 text-left">
              <span style={{ fontFamily: value }}>{currentFont.label}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {currentFont.category}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-2" align="start">
          <div className="max-h-72 overflow-y-auto space-y-1">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                className={cn(
                  "w-full flex flex-col items-start p-3 rounded-lg transition-colors",
                  value === font.value
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
                onClick={() => onChange(font.value)}
                data-testid={`font-option-${font.value.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm">{font.label}</span>
                  <span className="text-xs text-muted-foreground">{font.category}</span>
                  {value === font.value && (
                    <Check className="w-4 h-4 text-primary ml-2" />
                  )}
                </div>
                <span
                  className="text-lg mt-1 text-muted-foreground"
                  style={{ fontFamily: font.value }}
                >
                  {font.preview}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
