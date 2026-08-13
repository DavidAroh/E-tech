import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="section-padding min-h-[70dvh] bg-black pt-36">
      <div className="container-content max-w-2xl">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60">
          <span aria-hidden>●</span>
          <span>Coming soon</span>
        </p>
        <h1 className="heading-display mb-4 text-4xl font-bold text-white md:text-5xl">
          {title}
        </h1>
        <p className="mb-8 max-w-prose text-base leading-relaxed text-beige-muted">
          {description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/#consultation" className="btn-ghost">
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
