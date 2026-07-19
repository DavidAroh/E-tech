import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Etela Technologies.",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="Full privacy policy content will be published here. For data requests in the meantime, email info@etelatechnologies.com."
    />
  );
}
