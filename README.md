# Etela Technologies (E-Tech)

Premium dark-first marketing site for **Etela Technologies**, an AI Advisory & Cybersecurity consulting firm.

**Tagline:** Rise. Defend. Overcome.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (brand tokens in `tailwind.config.ts` + CSS variables)
- Framer Motion
- lucide-react
- Supabase (consultation + newsletter)
- Vercel-ready

## Getting started

```bash
npm install
cp .env.example .env.local
# Optional: add Supabase keys for form persistence
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase env vars, consultation and newsletter endpoints still accept submissions and log payloads server-side (dev-friendly).

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Project structure

```
src/
  app/                 # App Router pages + API routes
  components/          # Named inventory components + sections
  data/content.ts      # Copy, services, FAQ, etc.
  lib/                 # motion helpers, supabase client, cn
supabase/schema.sql    # Table + RLS policies
```

## Component inventory

StickyNavbar, HeroSection, GlassCard, ServiceCard, ValueCard, WhyChooseFeature, IndustryPill, ProcessTimeline, TestimonialCarousel, FAQAccordion, ConsultationForm, ContactSection, SiteFooter, BackToTopButton, LoadingScreen, SectionEyebrow.

## Deploy on Vercel

1. Push the repo and import into Vercel.
2. Add the same env vars in the Vercel project settings.
3. Deploy.

## Future routes

Nav and footer already reserve slots for `/blog`, `/resources`, `/insights`, `/news`, `/careers`, `/team`, `/events`, `/portal`.
