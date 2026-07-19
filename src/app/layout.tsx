import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyNavbar } from "@/components/StickyNavbar";
import "./globals.css";

const LoadingScreen = dynamic(
  () => import("@/components/LoadingScreen").then((m) => m.LoadingScreen),
  { ssr: false }
);

const BackToTopButton = dynamic(
  () => import("@/components/BackToTopButton").then((m) => m.BackToTopButton),
  { ssr: false }
);

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://etelatechnologies.com"
  ),
  title: {
    default: "Etela Technologies | AI Advisory & Cybersecurity",
    template: "%s | Etela Technologies",
  },
  description:
    "Etela Technologies helps businesses adopt AI securely and responsibly. Boutique AI advisory and cybersecurity consulting. Rise. Defend. Overcome.",
  keywords: [
    "AI advisory",
    "cybersecurity consulting",
    "responsible AI",
    "AI governance",
    "Nigeria cybersecurity",
    "Etela Technologies",
  ],
  authors: [{ name: "Etela Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Etela Technologies",
    title: "Etela Technologies | AI Advisory & Cybersecurity",
    description:
      "Helping businesses adopt AI securely and responsibly. Boutique consulting at the intersection of AI strategy and cybersecurity.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etela Technologies | AI Advisory & Cybersecurity",
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
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="relative min-h-[100dvh] bg-black font-sans text-beige-muted antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="site-grain" aria-hidden />
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
