---
name: Etela Technologies
description: "Boutique AI Advisory & Cybersecurity. Rise. Defend. Overcome."
colors:
  black: "#000000"
  cocoa: "#6E4B2D"
  cocoa-light: "#745133"
  beige: "#DEBFA2"
  beige-muted: "#E0C1A4"
  white: "#FAFAF8"
  purple: "#745133"
  purple-mid: "#6E4B2D"
  purple-light: "#CFB093"
  purple-dim: "#3D2819"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.35rem, 5vw, 3.15rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  shell: "2rem"
  core: "1.625rem"
  card: "1.25rem"
  media: "1.75rem"
  control: "9999px"
spacing:
  section-y: "6rem"
  section-y-lg: "10rem"
  gutter: "1rem"
  gutter-lg: "2rem"
  content-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.beige}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.beige-muted}"
    textColor: "{colors.cocoa}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.beige}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-secondary-light:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  card-bezel:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.beige-muted}"
    rounded: "{rounded.shell}"
    padding: "6px"
  input-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.cocoa}"
    rounded: "1rem"
    padding: "14px 16px"
  chip-industry:
    backgroundColor: "rgba(110, 75, 45, 0.4)"
    textColor: "{colors.beige}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  nav-island:
    backgroundColor: "rgba(110, 75, 45, 0.72)"
    textColor: "{colors.beige-muted}"
    rounded: "{rounded.control}"
    height: "56px"
---

# Design System: Etela Technologies

## 1. Overview

**Creative North Star: "The Boardroom Briefing"**

This is a dark-first marketing system for a boutique AI Advisory & Cybersecurity firm. Surfaces should feel safe to open in a C-suite meeting: measured, discreet, and executive-ready. Depth comes from alternating pure black (`#000000`) and dark bronze (`#6E4B2D`) panels, not from neon glow or mesh gradients. Champagne is the seal of decision: warm, deliberate, never the wallpaper.

The system pairs Fraunces (editorial serif display) with Plus Jakarta Sans (calm UI body). Motion is choreographed but **visible-first**: content is always readable; entrances only add a slight rise. Glass and blur belong exclusively to sticky chrome (floating nav, overlays). Content cards use double-bezel solid surfaces, not frosted glass walls.

The homepage is distilled to one conversion goal: book a consultation. Secondary complexity is progressive disclosure, not a wall of identical cards.

**Key Characteristics:**
- Dark chamber + warm bronze depth; one intentional light form panel
- Serif display / sans body; optical sizing on headlines
- Double-bezel cards; floating island nav; pill CTAs with nested icon
- Champagne accent ≤ ~10% of any screen; warm text hierarchy on dark
- Fixed film grain at low opacity; no edge-to-edge sticky bars

## 2. Colors

Warm champagne and bronze neutrals with a restrained bronze accent: boardroom ink, dark bronze depth, champagne glow, and a single decision seal.

### Primary
- **Decision Bronze** (`#745133`): Primary CTAs, form accents, selected radio states. The only saturated action color on light panels.
- **Decision Bronze Dark** (`#6E4B2D`): Hover for primary buttons; large decorative linework. Do not use for small body text on black (fails AA).
- **Decision Warm Beige** (`#CFB093`): Labels, eyebrows, focus rings, icons on dark. AA-safe on black for small text (~8:1).
- **Decision Bronze Dim** (`#3D2819`): Icon wells, soft accent backgrounds.

### Neutral
- **Chamber Black** (`#000000`): Base page background.
- **Dark Bronze Panel** (`#6E4B2D`): Alternating sections, footer, card cores.
- **Bronze Hairline** (`#745133`): Borders and dividers on dark panels.
- **Champagne** (`#DEBFA2`): High-emphasis text, ghost button labels, selection text, primary CTA background.
- **Light Champagne** (`#E0C1A4`): Default body text on dark (~10:1 on black).
- **Paper White** (`#FAFAF8`): Headings when pure white would be harsh; the consultation form surface only.

### Named Rules
**The One Seal Rule.** Bronze occupies ≤ ~10% of any viewport. If a section feels "bronze-heavy," desaturate backgrounds and keep bronze on CTAs, focus, and micro-labels only.

**The Paperwork Rule.** Exactly one light surface on the marketing site: the consultation form panel. No light/dark toggle; the site *is* dark.

**The Alternating Chamber Rule.** Adjacent full-width sections alternate `black` and `dark-bronze`. Never stack pure black on pure black without a bronze (or intentional light form) break.

## 3. Typography

**Display Font:** Fraunces (Georgia fallback)
**Body Font:** Plus Jakarta Sans (system-ui fallback)

**Character:** Editorial authority meets quiet UI clarity. Serif carries the brief; sans runs the instruments. Never mix a second display serif or a second geometric UI sans.

### Hierarchy
- **Display** (700, clamp ~2.35–3.15rem, lh ~1.08, tracking −0.02em): Hero H1 only. Class: `.heading-display`.
- **Headline** (600, clamp ~1.875–2.5rem, lh ~1.15, tracking −0.02em): Section H2s.
- **Title** (600, ~1.125rem, lh ~1.3): Card titles, mission pull-quotes.
- **Body** (400, 1rem / 1.125rem large, lh ~1.65, max ~65ch): Paragraphs, form helper text.
- **Label** (600, 10px / 0.625rem, tracking 0.15–0.2em, uppercase): Eyebrow pills, footer column titles, contact row labels. Use sparingly (≤1 eyebrow per ~3 sections).

Weights loaded: Fraunces 600/700; Jakarta 400/500/600.

### Named Rules
**The Visible-Type Rule.** Never gate text behind opacity 0 or blur. Motion may translate; type must paint readable on first frame.

**The Eyebrow Ration Rule.** Tiny uppercase tracked labels are a brand tool, not section scaffolding. Prefer a strong H2 alone.

## 4. Elevation

Depth is mostly **tonal** (black ↔ dark bronze) and **machined** (double-bezel shells). Shadows are soft, dark-room ambient, never harsh Material-style drops. Glass is reserved for chrome, not scrolling content.

### Shadow Vocabulary
- **Bezel dark** (`inset 0 1px 1px rgba(255,255,255,0.08), 0 24px 48px -24px rgba(0,0,0,0.55)`): Card cores on dark sections.
- **Bezel light** (`inset 0 1px 1px rgba(255,255,255,0.55), 0 20px 40px -20px rgba(110,75,45,0.18)`): Consultation form paper panel.
- **Island** (`0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`): Floating nav pill, toast/back-to-top.

### Named Rules
**The Chrome-Only Glass Rule.** `backdrop-filter` / blur only on fixed or sticky chrome (nav, modal overlays). Content cards use solid dark-bronze/black fills with hairline beige borders (`beige` at 5–8% opacity).

**The Double-Bezel Rule.** Premium containers are shell + core: outer `rounded-shell` (2rem) + padding 6px + inner `rounded-core` with distinct fill. Flat single-border cards are the exception for dense lists, not the default.

## 5. Components

Character: refined and restrained; tactile on press (`active:scale-[0.98]`), never bounce.

### Buttons
- **Shape:** Full pill (`border-radius: 9999px`).
- **Primary:** Champagne fill, dark bronze label, padding ~14×24px; nested circular icon well (32px) that translates on hover.
- **Hover:** Fill → light champagne; duration 400ms, ease `cubic-bezier(0.32, 0.72, 0, 1)`.
- **Ghost:** Transparent, champagne border ~25%, champagne text; border strengthens on hover.
- **Secondary (on light form):** Dark bronze text, dark bronze/15 border; hover bronze stroke/text.
- **Focus:** Global `:focus-visible` outline 2px warm-beige, offset 3px.

### Chips / Industry pills
- **Style:** Rounded-full, dark-bronze/40 fill, bronze border, champagne label, optional Phosphor light icon in warm-beige.
- **Hover:** Border shifts toward warm-beige at ~35% opacity.

### Cards / Containers
- **Corner Style:** Shell 2rem outer; core ~1.625rem inner.
- **Background:** Dark bronze or black/40 soft core; outer shell champagne/3% wash.
- **Border:** 1px champagne at 5–8% opacity (never 1px solid gray).
- **Internal Padding:** ~24–28px on card content.
- **Hover:** Scale ~1.015; border may warm toward warm-beige/40.
- **Service cards:** Icon well, title, short description; no "Learn More" clutter on the distilled homepage.

### Inputs / Fields (light form only)
- **Style:** Paper white fill, dark bronze text, rounded-2xl (~16px), padding 14×16px, dark-bronze/12 border.
- **Placeholder:** dark-bronze at ≥70% opacity for AA.
- **Focus:** Bronze border + bronze/20 ring.
- **Error:** Red-600 border + alert text below field; `aria-invalid` + `aria-describedby`.
- **Constraints:** Shared max lengths; past dates blocked; phone 7–15 digits.

### Navigation
- **Style:** Floating glass island, centered, max-width ~56rem, height 56–64px, detached from top (~16–24px).
- **Typography:** 13px medium sans, beige-muted → white on hover.
- **Mobile:** Hamburger morphs to X; full-width dialog panel with focus trap; display-size link list.
- **Search:** Command-palette modal (Ctrl/Cmd+K); focus trap; Esc closes.

### Signature: Hero illustration
- Abstract node lattice + shield path in low-opacity bronze/champagne linework.
- Framed in double-bezel media shell; `role="img"` with descriptive alt/aria-label.
- Never robots, brains, or stock hands.

### Signature: Process timeline
- Numbered 1–6 steps; horizontal connector on desktop, vertical on mobile.
- Draw-in line via scroll-linked scale (transform only).

### Motion (fold into component behavior)
- **Entrance ease:** `cubic-bezier(0.16, 1, 0.3, 1)` (~0.7s).
- **Interactive ease:** `cubic-bezier(0.32, 0.72, 0, 1)` or `0.4, 0, 0.2, 1`.
- **Stagger:** 0.08s per child in grids.
- **Reduced motion:** Instant or static; no theatrical loading curtain.
- **Loading screen:** Optional first-visit only; never empty black overlay; hard unmount ≤2s.

### Z-index scale
- Grain: 1 (under UI) · Sticky: 50 · Overlay: 60 · Modal: 70 · Toast: 80 · Loader: 90

## 6. Do's and Don'ts

### Do:
- **Do** alternate chamber black and dark bronze panels for section rhythm.
- **Do** reserve bronze for CTAs, focus, and micro-labels (The One Seal Rule).
- **Do** use double-bezel shells for featured containers and solid fills for content cards.
- **Do** keep the consultation form as the single light paper surface.
- **Do** use Fraunces for display/headlines and Plus Jakarta Sans for body/UI only.
- **Do** keep motion visible-first; honor `prefers-reduced-motion`.
- **Do** expose secondary services via progressive disclosure, not a 16-card wall.
- **Do** maintain WCAG AA contrast (light-champagne on black; warm-beige for small labels on dark).
- **Do** trap focus in search and mobile menu; restore focus on close.
- **Do** leave room in nav for future routes (insights, careers, team, portal) without redesigning the shell.

### Don't:
- **Don't** ship generic AI-startup landing patterns: glowing brains, robot hands, mesh gradients, neon glows (PRODUCT.md anti-references).
- **Don't** use playful SaaS energy: bounce easing, emoji decoration, cartoon illustrations.
- **Don't** build identical three-column feature card walls with thick icons as the default layout.
- **Don't** use cream/agency light mode or loud gradient-text heroes.
- **Don't** apply glassmorphism or backdrop-blur to scrolling content cards.
- **Don't** glue an edge-to-edge sticky bar to the top; use the floating island.
- **Don't** put an uppercase tracked eyebrow above every section.
- **Don't** use Inter, Lucide thick defaults, or pure black/white `#000`/`#fff` as brand surfaces.
- **Don't** gate content on opacity 0 or filter blur for "premium" entrances.
- **Don't** invent a second accent color family (no teal/cyan companion "tech" palette).
