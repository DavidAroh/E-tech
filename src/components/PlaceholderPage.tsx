import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="section-padding min-h-[70dvh] bg-black pt-36">
      <div className="container-content max-w-2xl">
        <span className="mb-5 inline-flex items-center rounded-full border border-beige/10 bg-beige/[0.04] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-light">
          Coming soon
        </span>
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
