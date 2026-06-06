"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  "Clothing & Apparel",
  "Electronic Gadgets",
  "Home Decor",
  "Health & Skincare",
];

export default function Hero() {
  return (
    <header className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 pb-6 text-center md:pt-32">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/75"
      >
        <span className="h-2 w-2 animate-float rounded-full bg-accent" />
        Handpicked finds across four worlds
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display text-5xl font-semibold leading-[1.02] md:text-7xl"
      >
        Things worth
        <br />
        <span className="text-gradient">a second look.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-6 max-w-xl text-lg text-white/60"
      >
        A cinematic, lovingly curated storefront. Spin the featured pieces in
        360°, browse by category, then grab them on Amazon.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        {CATEGORIES.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.06 }}
            className="glass rounded-full px-3.5 py-1.5 text-xs text-white/70"
          >
            {c}
          </motion.span>
        ))}
      </motion.div>

      <motion.a
        href="#collection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-sm text-white/50 transition-colors hover:text-white"
      >
        ↓ Browse the collection
      </motion.a>
    </header>
  );
}
