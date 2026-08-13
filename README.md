# Etela Technologies (E-Tech)

Premium dark-first marketing site for **Etela Technologies**, an AI Advisory & Cybersecurity consulting firm.

**Tagline:** Rise. Defend. Overcome.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (brand tokens in `tailwind.config.ts` + CSS variables)
- Framer Motion
- Phosphor Icons (`@phosphor-icons/react`)
- Firebase Admin SDK → Cloud Firestore (consultation, newsletter, client assessment)
- Vercel-ready

## Getting started

```bash
npm install
cp .env.example .env.local
# Optional: add Firebase Admin credentials for form persistence
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Firebase env vars, the consultation, newsletter and assessment endpoints still accept submissions and log payloads server-side (dev-friendly).

## Firebase setup

The backend uses Cloud Firestore written to from Next.js API routes via the
**Firebase Admin SDK** (server-side only — no client SDK is shipped to the browser).

1. Create a Firebase project at <https://console.firebase.google.com>.
2. **Project settings → Service accounts → "Generate new private key"** — this downloads a service-account JSON.
3. Create the collections in Firestore (they're created on first write automatically), then apply the rules in `firestore.rules`.
4. Create composite indexes for the queries that need them — see `firestore.indexes.json` (import via the Firebase CLI: `firebase firestore:indexes`).
5. Set in `.env.local`:

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Project structure

```
src/
  app/                 # App Router pages + API routes
  components/          # Named inventory components + sections
  components/assessment/  # Client Assessment flow (landing, flow, results)
  data/                # content.ts (marketing copy/services) + assessment.ts (PRD model)
  lib/                 # firebase, motion helpers, assessment engine, cn
firestore.rules        # Firestore security rules (anon-write-only collections)
firestore.indexes.json # Composite indexes for the admin/lead queries
```

## Component inventory

StickyNavbar, HeroSection, GlassCard, ServiceCard, ValueCard, WhyChooseFeature, IndustryPill, ProcessTimeline, TestimonialCarousel, FAQAccordion, ConsultationForm, ContactSection, SiteFooter, BackToTopButton, LoadingScreen, SectionEyebrow, AssessmentApp, AssessmentLanding, AssessmentFlow, AssessmentResults, AssessmentCtaSection.

## Deploy on Vercel

1. Push the repo and import into Vercel.
2. Add the same Firebase env vars in the Vercel project settings (use the "Encrypt" option for `FIREBASE_PRIVATE_KEY` to preserve newlines).
3. Deploy.

## Future routes

Nav and footer already reserve slots for `/blog`, `/resources`, `/insights`, `/news`, `/careers`, `/team`, `/events`, `/portal`.
