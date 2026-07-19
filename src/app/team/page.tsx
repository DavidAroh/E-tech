import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the Etela Technologies team. Profile pages coming soon.",
};

export default function TeamPage() {
  return (
    <PlaceholderPage
      title="Team"
      description="Leadership and specialist profiles will be published on this route."
    />
  );
}
