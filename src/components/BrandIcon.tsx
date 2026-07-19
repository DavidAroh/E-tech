"use client";

import type { Icon } from "@phosphor-icons/react";
import {
  Airplane,
  ArrowUp,
  ArrowUpRight,
  ArrowsClockwise,
  Bank,
  BookOpen,
  Brain,
  Briefcase,
  Buildings,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  CheckCircle,
  CircleNotch,
  ClipboardText,
  Cloud,
  Crosshair,
  Drop,
  EnvelopeSimple,
  Eye,
  Factory,
  Fingerprint,
  Graph,
  GraduationCap,
  Handshake,
  HardDrives,
  Heartbeat,
  Key,
  Leaf,
  Lock,
  MagnifyingGlass,
  MapPin,
  Phone,
  Scales,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkle,
  Target,
  Trophy,
  Users,
  X,
  Clock,
} from "@phosphor-icons/react";
import type { IconName } from "@/data/content";
import { cn } from "@/lib/cn";

const ICONS: Record<IconName, Icon> = {
  shield: Shield,
  brain: Brain,
  lock: Lock,
  search: MagnifyingGlass,
  scales: Scales,
  users: Users,
  cloud: Cloud,
  crosshair: Crosshair,
  key: Key,
  book: BookOpen,
  graph: Graph,
  clipboard: ClipboardText,
  eye: Eye,
  drives: HardDrives,
  grad: GraduationCap,
  fingerprint: Fingerprint,
  bank: Bank,
  heart: Heartbeat,
  bag: ShoppingBag,
  factory: Factory,
  buildings: Buildings,
  plane: Airplane,
  drop: Drop,
  phone: Phone,
  briefcase: Briefcase,
  sparkle: Sparkle,
  handshake: Handshake,
  trophy: Trophy,
  shieldCheck: ShieldCheck,
  refresh: ArrowsClockwise,
  target: Target,
  leaf: Leaf,
  check: Check,
  clock: Clock,
  mail: EnvelopeSimple,
  map: MapPin,
  arrowUpRight: ArrowUpRight,
  arrowUp: ArrowUp,
  caretDown: CaretDown,
  caretLeft: CaretLeft,
  caretRight: CaretRight,
  spinner: CircleNotch,
  checkCircle: CheckCircle,
  x: X,
};

type BrandIconProps = {
  name: IconName;
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  "aria-hidden"?: boolean | "true" | "false";
};

export function BrandIcon({
  name,
  className,
  weight = "light",
  "aria-hidden": ariaHidden = true,
}: BrandIconProps) {
  const Comp = ICONS[name];
  if (!Comp) return null;
  return (
    <Comp
      className={cn(className)}
      weight={weight}
      aria-hidden={ariaHidden}
    />
  );
}
