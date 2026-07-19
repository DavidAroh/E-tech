import { aboutParagraphs, homepageValues, mission } from "@/data/content";
import { SectionReveal } from "../SectionReveal";

/**
 * Distilled about: mission + two short paragraphs + four value words.
 */
export function AboutSection() {
  return (
    <SectionReveal
      id="about"
      aria-labelledby="about-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <div className="mx-auto max-w-3xl">
          <h2
            id="about-heading"
            className="heading-display mb-6 text-3xl font-semibold text-white md:text-4xl"
          >
            Secure, responsible AI adoption
          </h2>
          <p className="heading-display mb-8 text-xl font-semibold leading-snug text-beige md:text-2xl md:leading-snug">
            {mission}
          </p>
          <div className="space-y-5">
            {aboutParagraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="max-w-prose text-base leading-relaxed text-beige-muted md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-beige/10 pt-8">
            {homepageValues.map((value) => (
              <li
                key={value}
                className="font-sans text-sm font-medium tracking-wide text-beige"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
