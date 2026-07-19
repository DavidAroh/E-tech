import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Etela Technologies.",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms of Use"
      description="Website terms will be published on this page. Engagement-specific terms are provided in client agreements."
    />
  );
}
