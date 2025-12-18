import { useState } from "react";
import ColorPicker from "../ColorPicker";

export default function ColorPickerExample() {
  const [color, setColor] = useState("#7c3aed");
  
  return (
    <div className="bg-card p-4 rounded-lg max-w-sm">
      <ColorPicker
        label="Top Color"
        value={color}
        onChange={setColor}
      />
    </div>
  );
}
