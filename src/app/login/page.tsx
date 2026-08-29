"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const justSignedUp = searchParams.get("confirm") === "1";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="glass-panel rounded-xl p-8 w-full max-w-sm border border-card-border">
        <h1 className="text-xl font-semibold mb-1">
          Log in to <span className="text-accent-gold">HALO</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          M A D HALO Technologies
        </p>

        {justSignedUp && (
          <p className="text-sm text-accent-gold mb-4">
            Account created! Check your email to confirm, then log in.
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <Button variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-accent-gold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}