import { contactInfo } from "@/data/content";
import type { IconName } from "@/data/content";
import { BrandIcon } from "./BrandIcon";
import { SectionReveal } from "./SectionReveal";

const socialIconPaths: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  ),
  Facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  X: (
    <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768" />
  ),
};

/**
 * Contact Us — a visual feature panel carries the page's identity while the
 * dark-brown strip below holds the actual contact details, socials and CTA.
 */
export function ContactSection() {
  return (
    <SectionReveal
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        {/* Visual feature: node-lattice motif echoing the hero illustration */}
        <div className="relative mb-12 overflow-hidden rounded-card border border-beige/25">
          <div className="relative flex aspect-[16/7] flex-col items-center justify-center gap-4 bg-ink px-6 text-center md:aspect-[16/6]">
            <svg
              viewBox="0 0 480 200"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <g stroke="rgba(0,184,255,0.30)" strokeWidth="0.8">
                <line x1="40" y1="160" x2="150" y2="60" />
                <line x1="150" y1="60" x2="270" y2="130" />
                <line x1="270" y1="130" x2="390" y2="50" />
                <line x1="90" y1="40" x2="150" y2="60" />
                <line x1="270" y1="130" x2="340" y2="170" />
                <line x1="340" y1="170" x2="440" y2="120" />
              </g>
              {[
                [40, 160],
                [90, 40],
                [150, 60],
                [270, 130],
                [340, 170],
                [390, 50],
                [440, 120],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="rgba(0,184,255,0.75)" />
              ))}
              <circle cx="240" cy="100" r="80" stroke="rgba(0,184,255,0.14)" strokeDasharray="4 8" />
            </svg>
            <div className="relative">
              <h2
                id="contact-heading"
                className="heading-display mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              >
                Contact Us
              </h2>
              <p className="mx-auto max-w-xl text-lg font-medium leading-relaxed text-white">
                Call, email, or book a consultation. We respond during business
                hours.
              </p>
            </div>
          </div>
        </div>

        {/* Info strip: contact details on the dark-brown band */}
        <div className="border-y border-white/20 py-10 md:py-12">
          <ul className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            <ContactItem
              icon="phone"
              label="Phone"
              value={contactInfo.phone}
              href={contactInfo.phoneHref}
            />
            <ContactItem
              icon="mail"
              label="Email"
              value={contactInfo.email}
              href={contactInfo.emailHref}
            />
            <ContactItem
              icon="clock"
              label="Business Hours"
              value={contactInfo.hours}
            />
            <ContactItem
              icon="map"
              label="Location"
              value="Nigeria · Virtual and in-person"
            />
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {contactInfo.socials.map((social) => {
              const isPlaceholder =
                !social.href || social.href === "#" || social.href === "";
              const className =
                "flex h-11 w-11 items-center justify-center rounded-media border border-white/30 text-white transition-colors duration-200 hover:border-peach-bright hover:text-peach-bright active:scale-[0.97]";
              const icon = (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {socialIconPaths[social.label]}
                </svg>
              );

              if (isPlaceholder) {
                return (
                  <span
                    key={social.label}
                    className={`${className} cursor-not-allowed opacity-45`}
                    aria-label={`${social.label} (coming soon)`}
                    title="Link coming soon"
                  >
                    {icon}
                  </span>
                );
              }

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={className}
                >
                  {icon}
                </a>
              );
            })}
          </div>

          <a href="#consultation" className="btn-white group">
            Book a Consultation
            <span className="btn-icon">
              <BrandIcon name="arrowUpRight" weight="regular" className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-media border border-white/25 bg-black/25">
        <BrandIcon name={icon} className="h-5 w-5 text-peach-bright" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
          {label}
        </span>
        <span className="mt-1 block font-sans text-base font-bold text-white break-words">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          className="flex items-start gap-4 transition-colors duration-200 hover:text-peach-bright"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-start gap-4">{content}</li>;
}
