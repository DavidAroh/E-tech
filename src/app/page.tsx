import dynamic from "next/dynamic";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/HeroSection";

/**
 * Distilled homepage flow — one conversion goal: book a consultation.
 * Section surfaces alternate black / cocoa for depth.
 */

const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then(
      (m) => m.ServicesSection
    ),
  { loading: () => <SectionSkeleton tone="black" /> }
);
const ProcessSection = dynamic(
  () =>
    import("@/components/sections/ProcessSection").then(
      (m) => m.ProcessSection
    ),
  { loading: () => <SectionSkeleton tone="cocoa" /> }
);
const IndustriesSection = dynamic(
  () =>
    import("@/components/sections/IndustriesSection").then(
      (m) => m.IndustriesSection
    ),
  { loading: () => <SectionSkeleton tone="black" /> }
);
const AssessmentCtaSection = dynamic(
  () =>
    import("@/components/sections/AssessmentCtaSection").then(
      (m) => m.AssessmentCtaSection
    ),
  { loading: () => <SectionSkeleton tone="cocoa" /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (m) => m.TestimonialsSection
    ),
  { loading: () => <SectionSkeleton tone="cocoa" /> }
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => m.FAQSection),
  { loading: () => <SectionSkeleton tone="black" /> }
);
const ConsultationSection = dynamic(
  () =>
    import("@/components/sections/ConsultationSection").then(
      (m) => m.ConsultationSection
    ),
  { loading: () => <SectionSkeleton tone="cocoa" /> }
);
const ContactSection = dynamic(
  () => import("@/components/ContactSection").then((m) => m.ContactSection),
  { loading: () => <SectionSkeleton tone="black" /> }
);

function SectionSkeleton({ tone }: { tone: "black" | "cocoa" }) {
  return (
    <div
      className={`section-padding ${tone === "black" ? "bg-black" : "bg-cocoa"}`}
      aria-hidden
    >
      <div className="container-content">
        <div className="mb-6 h-3 w-28 max-w-full animate-pulse rounded-full bg-beige/10" />
        <div className="h-10 w-full max-w-md animate-pulse rounded-2xl bg-beige/[0.06]" />
        <div className="mt-8 h-24 w-full max-w-2xl animate-pulse rounded-shell bg-beige/[0.04]" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <AssessmentCtaSection />
      <TestimonialsSection />
      <FAQSection />
      <ConsultationSection />
      <ContactSection />
    </>
  );
}
