"use client";

import { motion } from "framer-motion";
import { Category, CategoryId } from "@/lib/types";

type Filter = CategoryId | "all";

export default function CategoryNav({
  categories,
  active,
  onChange,
}: {
  categories: Category[];
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  const items: { id: Filter; name: string; accent: string }[] = [
    { id: "all", name: "All", accent: "#E7C87A" },
    ...categories.map((c) => ({ id: c.id, name: c.name, accent: c.accent })),
  ];

  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="sticky top-4 z-30 mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-full p-1.5 glass"
    >
      {items.map((it) => {
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(it.id)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{ color: isActive ? "#0c0a09" : "rgba(255,255,255,0.7)" }}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: it.accent }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            {it.name}
          </button>
        );
      })}
    </div>
  );
}
