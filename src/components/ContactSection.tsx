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

export function ContactSection() {
  return (
    <SectionReveal
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <div className="mb-12 max-w-3xl border-b border-beige/25 pb-8 md:mb-14 md:pb-10">
          <h2
            id="contact-heading"
            className="heading-display mb-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
          >
            Contact
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-beige-muted md:text-lg">
            Call, email, or book a consultation. We respond during business
            hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          <ul className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
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

          <div>
            <div
              className="mb-8 flex aspect-[16/10] flex-col items-center justify-center gap-3 border border-beige/25 px-6 text-center"
              role="img"
              aria-label="Nigeria-based practice offering virtual and in-person engagements"
            >
              <BrandIcon name="map" className="h-8 w-8 text-purple-light" />
              <div>
                <p className="font-sans text-sm font-medium text-beige">
                  Nigeria-based practice
                </p>
                <p className="mt-1 font-sans text-sm text-beige-muted">
                  Virtual and in-person engagements nationwide
                </p>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {contactInfo.socials.map((social) => {
                const isPlaceholder =
                  !social.href || social.href === "#" || social.href === "";
                const className =
                  "flex h-11 w-11 items-center justify-center rounded-media border border-beige/25 text-beige transition-colors duration-300 hover:border-purple-light/40 hover:text-purple-light";
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

            <a href="#consultation" className="btn-primary group">
              Book a Consultation
              <span className="btn-icon">
                <BrandIcon name="arrowUpRight" className="h-4 w-4" />
              </span>
            </a>
          </div>
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
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-media border border-beige/25 bg-black/15">
        <BrandIcon name={icon} className="h-5 w-5 text-purple-light" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] tracking-[0.16em] text-beige-muted">
          {label}
        </span>
        <span className="mt-1 block font-sans text-base font-medium text-beige break-words">
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
          className="flex items-start gap-4 transition-colors duration-300 hover:text-white"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-start gap-4">{content}</li>;
}
