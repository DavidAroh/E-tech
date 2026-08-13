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
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand — largest share */}
          <div className="lg:col-span-5">
            <Logo className="mb-5" />
            <p className="mb-3 font-display text-sm italic text-beige/80">
              Rise. Defend. Overcome.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-beige-muted">
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

        <div className="mt-14 border-t border-cocoa-light/30 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <NewsletterForm />
          </div>

          <p className="mt-10 font-sans text-xs text-beige-muted/70">
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
