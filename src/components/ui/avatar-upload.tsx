"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl: string | null;
}

export function AvatarUpload({ userId, currentAvatarUrl }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);

    setUploading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-card-border overflow-hidden flex items-center justify-center">
        {currentAvatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentAvatarUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-xs">No photo</span>
        )}
      </div>
      <div>
        <label className="cursor-pointer text-sm text-accent-gold hover:underline">
          {uploading ? "Uploading..." : "Change photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    </div>
  );
}

