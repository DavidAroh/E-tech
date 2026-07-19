import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thought leadership on AI governance, cybersecurity, and responsible technology adoption from Etela Technologies.",
};

export default function InsightsPage() {
  return (
    <PlaceholderPage
      title="Insights"
      description="Long-form analysis and briefings will live here. This route is reserved so the primary navigation can expand without rework."
    />
  );
}
