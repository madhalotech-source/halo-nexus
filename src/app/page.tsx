import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroVideo } from "@/components/ui/hero-video";
import { CtaButton } from "@/components/ui/cta-button";

const services = [
  {
    title: "Business Websites",
    description:
      "Premium, fast-loading websites built to represent your brand with confidence.",
  },
  {
    title: "E-commerce Websites",
    description:
      "Full online stores with secure payments, inventory, and a seamless checkout.",
  },
  {
    title: "Custom Business Systems",
    description:
      "CRMs, dashboards, and internal tools tailored exactly to how you work.",
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform apps for Android and iOS, built to scale.",
  },
  {
    title: "AI Chatbots",
    description:
      "Intelligent assistants that handle support, bookings, and FAQs 24/7.",
  },
  {
    title: "Business Automation",
    description:
      "Workflows that eliminate repetitive tasks so your team can focus on growth.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <HeroVideo />
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
          The Digital Operating System for{" "}
          <span className="text-accent-gold">M A D HALO Technologies</span>
        </h1>
        <p className="text-muted-foreground text-lg mt-6 max-w-xl">
          Websites, systems, and automation — engineered with precision,
          designed with intention.
        </p>
        <div className="flex gap-4 mt-10">
         <CtaButton className="px-6 py-3 rounded-md font-medium transition-colors cursor-pointer bg-accent text-white hover:bg-accent-light">
 Get Started
</CtaButton>

          <Button variant="secondary">View Our Work</Button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          What We Build
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          A full range of digital services, each built with the same
          attention to detail.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Our Work
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Selected projects will be featured here soon.
        </p>
        <Card className="text-center py-16">
          <p className="text-muted-foreground">
            Portfolio coming soon — check back shortly.
          </p>
        </Card>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Pricing
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          Every project is different. Let&apos;s talk about what you need
          and build a quote around it.
        </p>
        <Card className="text-center py-16 max-w-xl mx-auto">
          <h3 className="font-semibold text-xl mb-3">Get a Custom Quote</h3>
          <p className="text-muted-foreground text-sm mb-6">
            No fixed packages — just a solution built for your business.
          </p>
         <CtaButton className="px-6 py-3 rounded-md font-medium transition-colors cursor-pointer bg-accent text-white hover:bg-accent-light">
  Request a Quote
</CtaButton>

        </Card>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Reach out and let&apos;s talk about your next project.
        </p>
        <CtaButton className="px-6 py-3 rounded-md font-medium transition-colors cursor-pointer bg-accent text-white hover:bg-accent-light">
  Get Started
</CtaButton>
      </section>
    </main>
  );
}