import { footerLinks } from "@/data/content";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

/** Server Component — interactive newsletter is a client leaf */
export function SiteFooter() {
  return (
    <footer
      className="border-t border-cocoa-light/30 bg-cocoa"
      role="contentinfo"
    >
      <div className="container-content section-padding !pb-12 !pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <Logo className="mb-5" />
            <p className="mb-3 font-display text-sm italic text-beige/80">
              Rise. Defend. Overcome.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-beige-muted">
              AI advisory and cybersecurity for organizations that need secure,
              responsible technology adoption.
            </p>
          </div>

          <FooterColumn title="Quick Links" links={footerLinks.quick} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Company" links={footerLinks.company} />
        </div>

        <div className="mt-16 border-t border-cocoa-light/30 pt-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <NewsletterForm />
          </div>

          <p className="mt-12 font-sans text-xs text-beige-muted/70">
            &copy; 2026 Etela Technologies. All Rights Reserved.
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
      <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-light">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a
              href={link.href}
              className="font-sans text-sm text-beige-muted transition-colors duration-400 ease-premium hover:text-beige"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
