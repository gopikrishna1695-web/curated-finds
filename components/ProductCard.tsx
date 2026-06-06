"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Product } from "@/lib/types";

/**
 * Liquid-glass product card with a subtle 3D pointer-tilt and accent glow.
 * The whole card links to the Amazon affiliate URL.
 */
export default function ProductCard({
  product,
  accent,
  index,
}: {
  product: Product;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={product.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -6 }}
      className="glass glass-hover group relative block overflow-hidden rounded-3xl hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {/* Accent glow that strengthens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${accent}22, transparent 70%)`,
        }}
      />

      <div className="relative aspect-[4/5] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
      </div>

      <div className="relative p-5">
        <h3 className="font-display text-xl font-semibold text-white">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/60">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-transform group-hover:translate-x-0.5"
            style={{ color: accent }}
          >
            View on Amazon
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          {product.price && (
            <span className="text-sm font-semibold text-white">
              {product.price}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
