import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Etela Technologies. Careers page coming soon.",
};

export default function CareersPage() {
  return (
    <PlaceholderPage
      title="Careers"
      description="We will post open roles for advisors, researchers, and operators here. Check back soon or contact us directly."
    />
  );
}
