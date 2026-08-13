import dynamic from "next/dynamic";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/HeroSection";

/**
 * Distilled homepage flow — one conversion goal: book a consultation.
 * Flat index-rail structure; sections separated by hairlines.
 */

const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then(
      (m) => m.ServicesSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const ProcessSection = dynamic(
  () =>
    import("@/components/sections/ProcessSection").then(
      (m) => m.ProcessSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const IndustriesSection = dynamic(
  () =>
    import("@/components/sections/IndustriesSection").then(
      (m) => m.IndustriesSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const AssessmentCtaSection = dynamic(
  () =>
    import("@/components/sections/AssessmentCtaSection").then(
      (m) => m.AssessmentCtaSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (m) => m.TestimonialsSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => m.FAQSection),
  { loading: () => <SectionSkeleton /> }
);
const ConsultationSection = dynamic(
  () =>
    import("@/components/sections/ConsultationSection").then(
      (m) => m.ConsultationSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const ContactSection = dynamic(
  () => import("@/components/ContactSection").then((m) => m.ContactSection),
  { loading: () => <SectionSkeleton /> }
);

function SectionSkeleton() {
  return (
    <div className="section-padding bg-black" aria-hidden>
      <div className="container-content">
        <div className="mb-6 h-3 w-28 max-w-full animate-pulse rounded-media bg-beige/10" />
        <div className="h-10 w-full max-w-md animate-pulse rounded-2xl bg-beige/[0.06]" />
        <div className="mt-8 h-24 w-full max-w-2xl animate-pulse rounded-card bg-beige/[0.04]" />
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