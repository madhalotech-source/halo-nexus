import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-semibold text-lg tracking-tight">
            HALO <span className="text-accent-gold">Nexus</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            The Digital Operating System for M A D HALO Technologies.
          </p>
        </div>

        <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-card-border">
        <p className="max-w-6xl mx-auto px-6 py-6 text-xs text-muted-foreground">
          © {year} M A D HALO Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}