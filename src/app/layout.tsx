import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyNavbar } from "@/components/StickyNavbar";
import "./globals.css";

const AnalyticsInit = dynamic(
  () => import("@/components/AnalyticsInit").then((m) => m.AnalyticsInit),
  { ssr: false }
);

const LoadingScreen = dynamic(
  () => import("@/components/LoadingScreen").then((m) => m.LoadingScreen),
  { ssr: false }
);

const BackToTopButton = dynamic(
  () => import("@/components/BackToTopButton").then((m) => m.BackToTopButton),
  { ssr: false }
);

const SmoothScroll = dynamic(
  () => import("@/components/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://etelatechnology.com"
  ),
  title: {
    default: "Etela Technology | AI Advisory & Cybersecurity",
    template: "%s | Etela Technology",
  },
  description:
    "Etela Technology helps businesses adopt AI securely and responsibly. Boutique AI advisory and cybersecurity consulting. Rise. Defend. Overcome.",
  keywords: [
    "AI advisory",
    "cybersecurity consulting",
    "responsible AI",
    "AI governance",
    "Nigeria cybersecurity",
    "Etela Technology",
  ],
  authors: [{ name: "Etela Technology" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Etela Technology",
    title: "Etela Technology | AI Advisory & Cybersecurity",
    description:
      "Helping businesses adopt AI securely and responsibly. Boutique consulting at the intersection of AI strategy and cybersecurity.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etela Technology | AI Advisory & Cybersecurity",
    description:
      "Helping businesses adopt AI securely and responsibly. Rise. Defend. Overcome.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body className="relative min-h-[100dvh] bg-black font-sans text-beige-muted antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnalyticsInit />
        <SmoothScroll />
        <LoadingScreen />
        <div className="relative z-[2]">
          <StickyNavbar />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
        <BackToTopButton />
      </body>
    </html>
  );
}
