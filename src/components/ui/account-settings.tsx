"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const countries = [
  "South Africa", "United States", "United Kingdom", "Canada", "Australia",
  "Nigeria", "Kenya", "Zimbabwe", "Botswana", "Namibia", "Germany", "France",
  "Netherlands", "India", "United Arab Emirates", "Other",
];

interface AccountSettingsProps {
  userId: string;
  currentFullName: string;
  currentPhone: string | null;
  currentCountry: string | null;
}

export function AccountSettings({
  userId,
  currentFullName,
  currentPhone,
  currentCountry,
}: AccountSettingsProps) {
  const [fullName, setFullName] = useState(currentFullName);
  const [phone, setPhone] = useState(currentPhone ?? "");
  const [country, setCountry] = useState(currentCountry ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ full_name: fullName, phone, country })
      .eq("id", userId);

    setSaving(false);
    setSaved(true);
    router.refresh();
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+27 ..."
          className="w-full bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors"
      >
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
      </button>
    </form>
  );
}
