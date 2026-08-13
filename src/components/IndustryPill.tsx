import type { IconName } from "@/data/content";
import { BrandIcon } from "./BrandIcon";

type IndustryPillProps = {
  name: string;
  icon?: IconName;
};

export function IndustryPill({ name, icon }: IndustryPillProps) {
  return (
    <div className="flex min-h-11 items-center gap-2.5 rounded-media border border-beige/[0.1] bg-transparent px-5 py-2.5 text-sm font-medium text-beige transition-colors duration-300 hover:border-beige/25 hover:text-white">
      {icon ? (
        <BrandIcon name={icon} className="h-4 w-4 shrink-0 text-purple-light" />
      ) : null}
      <span>{name}</span>
    </div>
  );
}