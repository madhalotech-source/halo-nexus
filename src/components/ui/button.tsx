import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-md font-medium transition-colors cursor-pointer";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-light",
    secondary:
      "border border-card-border text-foreground hover:border-accent",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}