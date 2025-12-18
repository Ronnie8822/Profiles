import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";

interface AdvancedColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const presetColors = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b",
  "#1e293b", "#0f172a", "#fafafa", "#f5f5f5", "#e5e5e5", "#d4d4d4",
];

const gradientPresets = [
  { from: "#7c3aed", to: "#c084fc", name: "Purple Dream" },
  { from: "#ec4899", to: "#f97316", name: "Sunset" },
  { from: "#06b6d4", to: "#3b82f6", name: "Ocean" },
  { from: "#22c55e", to: "#10b981", name: "Forest" },
  { from: "#f59e0b", to: "#ef4444", name: "Fire" },
  { from: "#8b5cf6", to: "#06b6d4", name: "Aurora" },
];

// Helper functions for color conversion
function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 100, 50];
  
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  
  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function AdvancedColorPicker({ label, value, onChange }: AdvancedColorPickerProps) {
  const [hexInput, setHexInput] = useState(value);
  const [hsl, setHsl] = useState<[number, number, number]>(() => hexToHsl(value));

  useEffect(() => {
    setHexInput(value);
    setHsl(hexToHsl(value));
  }, [value]);

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
      setHsl(hexToHsl(hex));
    }
  };

  const handleHexBlur = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      setHexInput(value);
    }
  };

  const handleHslChange = useCallback((h: number, s: number, l: number) => {
    setHsl([h, s, l]);
    const newHex = hslToHex(h, s, l);
    setHexInput(newHex);
    onChange(newHex);
  }, [onChange]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            data-testid={`button-color-${label.toLowerCase().replace(/\s/g, "-")}`}
          >
            <div
              className="w-8 h-8 rounded-lg border border-border shadow-inner"
              style={{ backgroundColor: value }}
            />
            <span className="font-mono uppercase text-sm">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <Tabs defaultValue="presets">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="presets" className="flex-1">Presets</TabsTrigger>
              <TabsTrigger value="custom" className="flex-1">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="presets" className="space-y-3">
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-lg border border-border relative transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => onChange(color)}
                    data-testid={`preset-color-${color.slice(1)}`}
                  >
                    {value === color && (
                      <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="custom" className="space-y-4">
              <div
                className="w-full h-10 rounded-lg border border-border"
                style={{ backgroundColor: value }}
              />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Hue</span>
                    <span>{hsl[0]}</span>
                  </div>
                  <div 
                    className="h-3 rounded-full"
                    style={{
                      background: "linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))"
                    }}
                  >
                    <Slider
                      value={[hsl[0]]}
                      max={360}
                      step={1}
                      onValueChange={([h]) => handleHslChange(h, hsl[1], hsl[2])}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md"
                      data-testid="slider-hue"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Saturation</span>
                    <span>{hsl[1]}%</span>
                  </div>
                  <div 
                    className="h-3 rounded-full"
                    style={{
                      background: `linear-gradient(to right, hsl(${hsl[0]},0%,${hsl[2]}%), hsl(${hsl[0]},100%,${hsl[2]}%))`
                    }}
                  >
                    <Slider
                      value={[hsl[1]]}
                      max={100}
                      step={1}
                      onValueChange={([s]) => handleHslChange(hsl[0], s, hsl[2])}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md"
                      data-testid="slider-saturation"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lightness</span>
                    <span>{hsl[2]}%</span>
                  </div>
                  <div 
                    className="h-3 rounded-full"
                    style={{
                      background: `linear-gradient(to right, hsl(${hsl[0]},${hsl[1]}%,0%), hsl(${hsl[0]},${hsl[1]}%,50%), hsl(${hsl[0]},${hsl[1]}%,100%))`
                    }}
                  >
                    <Slider
                      value={[hsl[2]]}
                      max={100}
                      step={1}
                      onValueChange={([l]) => handleHslChange(hsl[0], hsl[1], l)}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md"
                      data-testid="slider-lightness"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Label className="text-xs text-muted-foreground mb-1.5 block">Hex Code</Label>
                <Input
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  onBlur={handleHexBlur}
                  placeholder="#000000"
                  className="font-mono uppercase"
                  data-testid={`input-hex-${label.toLowerCase().replace(/\s/g, "-")}`}
                />
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface GradientPickerProps {
  gradientFrom: string;
  gradientTo: string;
  useGradient: boolean;
  onGradientFromChange: (color: string) => void;
  onGradientToChange: (color: string) => void;
  onUseGradientChange: (use: boolean) => void;
}

export function GradientPicker({
  gradientFrom,
  gradientTo,
  useGradient,
  onGradientFromChange,
  onGradientToChange,
  onUseGradientChange,
}: GradientPickerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Background Style</Label>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          <Button
            size="sm"
            variant={!useGradient ? "secondary" : "ghost"}
            className="text-xs"
            onClick={() => onUseGradientChange(false)}
            data-testid="button-solid-color"
          >
            Solid
          </Button>
          <Button
            size="sm"
            variant={useGradient ? "secondary" : "ghost"}
            className="text-xs"
            onClick={() => onUseGradientChange(true)}
            data-testid="button-gradient"
          >
            Gradient
          </Button>
        </div>
      </div>

      <div
        className="h-24 rounded-xl border border-border"
        style={{
          background: useGradient
            ? `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
            : gradientFrom,
        }}
      />

      {useGradient ? (
        <div className="grid grid-cols-2 gap-4">
          <AdvancedColorPicker
            label="From"
            value={gradientFrom}
            onChange={onGradientFromChange}
          />
          <AdvancedColorPicker
            label="To"
            value={gradientTo}
            onChange={onGradientToChange}
          />
        </div>
      ) : (
        <AdvancedColorPicker
          label="Color"
          value={gradientFrom}
          onChange={onGradientFromChange}
        />
      )}

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">Quick Presets</Label>
        <div className="grid grid-cols-3 gap-2">
          {gradientPresets.map((preset) => (
            <button
              key={preset.name}
              className="h-12 rounded-xl border border-border relative group transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${preset.from} 0%, ${preset.to} 100%)`,
              }}
              onClick={() => {
                onGradientFromChange(preset.from);
                onGradientToChange(preset.to);
                onUseGradientChange(true);
              }}
              data-testid={`gradient-preset-${preset.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-xl">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
