"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

type StaggerGridProps = {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
};

/**
 * Client island: staggered enter for card grids only.
 * Moves a child's className onto the motion grid item so col-span utilities still work.
 */
export function StaggerGrid({
  children,
  className,
  itemClassName,
}: StaggerGridProps) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  const renderItem = (child: React.ReactNode, i: number) => {
    let spanClass: string | undefined;
    let content = child;

    if (isValidElement(child)) {
      const el = child as ReactElement<{ className?: string }>;
      spanClass = el.props.className;
      content = cloneElement(el, {
        className: undefined,
      });
    }

    if (reduce) {
      return (
        <div key={i} className={cn(itemClassName, spanClass)}>
          {content}
        </div>
      );
    }

    return (
      <motion.div
        key={i}
        variants={staggerItem}
        className={cn(itemClassName, spanClass)}
      >
        {content}
      </motion.div>
    );
  };

  if (reduce) {
    return (
      <div className={cn(className)}>{items.map((c, i) => renderItem(c, i))}</div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {items.map((c, i) => renderItem(c, i))}
    </motion.div>
  );
}
