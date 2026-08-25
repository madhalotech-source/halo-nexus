"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved !== "light";
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("light", !newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-card-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          HALO <span className="text-accent-gold">Nexus</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

          
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-md border border-card-border hover:border-accent transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        
        <Link
          href="#contact"
          className="hidden md:inline-block px-5 py-2 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors"
        >
          Get Started
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-foreground" />
          <span className="w-6 h-0.5 bg-foreground" />
          <span className="w-6 h-0.5 bg-foreground" />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav className="md:hidden glass-panel border-t border-card-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-2 rounded-md bg-accent text-white text-sm font-medium text-center"
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}

