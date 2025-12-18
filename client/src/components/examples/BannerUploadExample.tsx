import { useState } from "react";
import BannerUpload from "../BannerUpload";

export default function BannerUploadExample() {
  const [bannerUrl, setBannerUrl] = useState<string>();

  const handleUpload = (file: File) => {
    setBannerUrl(URL.createObjectURL(file));
  };

  return (
    <div className="bg-card p-6 rounded-lg max-w-md">
      <BannerUpload
        bannerUrl={bannerUrl}
        onUpload={handleUpload}
        onRemove={() => setBannerUrl(undefined)}
      />
    </div>
  );
}
