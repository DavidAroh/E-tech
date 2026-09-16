import { footerLinks } from "@/data/content";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

/**
 * Footer — chamber black with white content so it reads unambiguously as the
 * end of the page rather than a continuation of the Contact section.
 * Brand elements adapt to the dark surface for contrast.
 */
export function SiteFooter() {
  return (
    <footer
      className="border-t border-brass/40 bg-ink"
      role="contentinfo"
    >
      <div className="container-content !pb-12 !pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand — largest share */}
          <div className="lg:col-span-5">
            <Logo className="mb-5" />
            <p className="mb-3 font-display text-sm font-semibold text-white">
              Rise. Defend. Overcome.
            </p>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-white">
              AI advisory and cybersecurity for organizations that need secure,
              responsible technology adoption.
            </p>
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="Navigate" links={footerLinks.quick} />
          </div>
          <div className="lg:col-span-4">
            <FooterColumn title="Company" links={footerLinks.company} />
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-10">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 sm:grid-cols-4">
            {[
              ["Drawn", "E-Tech Studio"],
              ["Checked", "Assurance"],
              ["Scale", "—"],
              ["Sheet", "ET—Z901 · Rev C"],
            ].map(([term, value]) => (
              <div key={term} className="bg-ink px-4 py-3">
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-beige-muted">
                  {term}
                </dt>
                <dd className="tnum mt-1 font-sans text-xs font-semibold text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <NewsletterForm />
          </div>

          <p className="mt-10 font-mono text-xs font-medium text-white/80">
            &copy; 2026 Etela Technology. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-peach-bright">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a
              href={link.href}
              className="font-sans text-sm font-medium text-white transition-colors duration-300 hover:text-peach-bright"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
