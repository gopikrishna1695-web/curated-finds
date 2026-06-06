"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Category, Product } from "@/lib/types";
import Product360Viewer from "./Product360Viewer";
import AffiliateButton from "./AffiliateButton";

export default function FeaturedShowcase({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [active, setActive] = useState(0);
  const [switchKey, setSwitchKey] = useState(0);
  if (products.length === 0) return null;

  const product = products[active];
  const category = categories.find((c) => c.id === product.category);
  const accent = category?.accent ?? "#E7C87A";

  function select(i: number) {
    if (i === active) return;
    setActive(i);
    setSwitchKey((k) => k + 1);
  }

  return (
    <section id="featured" className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {products.map((p, i) => {
          const a =
            categories.find((c) => c.id === p.category)?.accent ?? "#E7C87A";
          const isActive = i === active;
          return (
            <button
              key={p.id}
              onClick={() => select(i)}
              className="relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
              style={{
                borderColor: isActive ? a : "rgba(255,255,255,0.12)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="featured-pill"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: `${a}22` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative order-1 h-[clamp(360px,52vw,640px)] lg:order-none">
          <AnimatePresence mode="wait">
            <motion.div key={product.id} className="h-full w-full">
              <Product360Viewer
                product={product}
                accent={accent}
                switchKey={switchKey}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {category?.name}
              </p>
              <h2 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
                {product.name}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                {product.description}
              </p>

              <div className="mt-10 flex items-center gap-5">
                <AffiliateButton product={product} accent={accent} />
                {product.price && (
                  <span className="text-2xl font-semibold text-white">
                    {product.price}
                  </span>
                )}
              </div>
              <p className="mt-4 text-xs text-white/40">
                As an Amazon Associate we earn from qualifying purchases.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
