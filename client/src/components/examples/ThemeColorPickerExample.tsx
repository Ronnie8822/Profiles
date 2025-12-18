import { useState } from "react";
import ThemeColorPicker from "../ThemeColorPicker";

export default function ThemeColorPickerExample() {
  const [primary, setPrimary] = useState("#d4c4bc");
  const [accent, setAccent] = useState("#a8918a");

  return (
    <div className="bg-card p-6 rounded-lg max-w-md">
      <ThemeColorPicker
        primaryColor={primary}
        accentColor={accent}
        onPrimaryChange={setPrimary}
        onAccentChange={setAccent}
      />
    </div>
  );
}
