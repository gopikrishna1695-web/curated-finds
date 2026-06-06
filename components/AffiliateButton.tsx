"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/types";

export default function AffiliateButton({
  product,
  accent,
}: {
  product: Product;
  accent: string;
}) {
  return (
    <motion.a
      href={product.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-ink-950"
      style={{ backgroundColor: accent, boxShadow: `0 0 50px -12px ${accent}` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">View on Amazon</span>
      <svg
        className="relative h-4 w-4 transition-transform group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </motion.a>
  );
}
