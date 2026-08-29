import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { LogoutButton } from "@/components/ui/logout-button";


export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

const { data: profile } = await supabase
  .from("profiles")
  .select("full_name, email, created_at, avatar_url")
  .eq("id", user.id)
  .single();

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-ZA", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
  <div className="flex items-center gap-6">
    <AvatarUpload userId={user.id} currentAvatarUrl={profile?.avatar_url ?? null} />
    <div>
      <h1 className="text-2xl font-semibold mb-1">
        Welcome, <span className="text-accent-gold">{profile?.full_name || "there"}</span>
      </h1>
      <p className="text-muted-foreground text-sm">
        {profile?.email} · Member since {memberSince}
      </p>
    </div>
  </div>
  <LogoutButton />
</div>

        <div className="glass-panel rounded-xl p-8 border border-card-border">
          <p className="text-muted-foreground">
            More dashboard features coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}