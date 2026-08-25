"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login?confirm=1");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="glass-panel rounded-xl p-8 w-full max-w-sm border border-card-border">
        <h1 className="text-xl font-semibold mb-1">
          Create your <span className="text-accent-gold">HALO</span> account
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Join M A D HALO Technologies
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min. 6 characters)"
            className="bg-transparent border border-card-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <Button variant="primary" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-accent-gold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}