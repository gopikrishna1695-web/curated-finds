"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Category, CategoryId, Product } from "@/lib/types";
import CategoryNav from "./CategoryNav";
import ProductCard from "./ProductCard";

type Filter = CategoryId | "all";

export default function ProductGrid({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const accentOf = useMemo(() => {
    const m = new Map<CategoryId, string>();
    categories.forEach((c) => m.set(c.id, c.accent));
    return (id: CategoryId) => m.get(id) ?? "#E7C87A";
  }, [categories]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.category === filter),
    [filter, products]
  );

  const heading =
    filter === "all"
      ? "The Collection"
      : categories.find((c) => c.id === filter)?.name ?? "";

  return (
    <section id="collection" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-4xl font-semibold md:text-5xl">
          {heading}
        </h2>
        <CategoryNav
          categories={categories}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              accent={accentOf(p.category)}
              index={i}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
