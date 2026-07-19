import { primaryServices } from "@/data/content";
import { MoreServices } from "../MoreServices";
import { SectionReveal } from "../SectionReveal";
import { ServiceCard } from "../ServiceCard";
import { StaggerGrid } from "../StaggerGrid";

/**
 * Distilled services: six primary cards + expandable title list for the rest.
 * No 16-card wall.
 */
export function ServicesSection() {
  return (
    <SectionReveal
      id="services"
      aria-labelledby="services-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        <div className="mb-12 max-w-2xl md:mb-14">
          <h2
            id="services-heading"
            className="heading-display mb-4 text-3xl font-semibold text-white md:text-4xl"
          >
            How we help
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-beige-muted">
            Six core engagements at the intersection of AI strategy and
            cybersecurity. Additional capabilities available on request.
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {primaryServices.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </StaggerGrid>

        <MoreServices />
      </div>
    </SectionReveal>
  );
}
