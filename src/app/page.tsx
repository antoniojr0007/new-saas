import { AboutSection } from "@/app/_components/landing/about-section";
import { ContactSection } from "@/app/_components/landing/contact-section";
import { CtaSection } from "@/app/_components/landing/cta-section";
import { FeaturesSection } from "@/app/_components/landing/features-section";
import { Footer } from "@/app/_components/landing/footer";
import { Header } from "@/app/_components/landing/header";
import { HeroSection } from "@/app/_components/landing/hero-section";
import { ProjectsSection } from "@/app/_components/landing/projects-section";
import { StatsSection } from "@/app/_components/landing/stats-section";
import { TestimonialsSection } from "@/app/_components/landing/testimonials-section";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <FeaturesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
