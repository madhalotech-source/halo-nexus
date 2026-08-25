"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface CtaButtonProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

export function CtaButton({ children, className, onClick }: CtaButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    onClick?.();

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}



