"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
  accent: string;
  /** Bumps when the user switches products, so we can replay the entrance. */
  switchKey: number;
};

/**
 * Renders one product on the cinematic stage.
 *  - frames360 (>1 image) -> drag-to-spin 360° viewer.
 *  - otherwise -> auto cross-fading multi-angle gallery (chosen fallback).
 */
export default function Product360Viewer({ product, accent, switchKey }: Props) {
  const has360 = (product.frames360?.length ?? 0) > 1;
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${accent}44, transparent 70%)`,
        }}
      />
      {has360 ? (
        <Spin360 product={product} switchKey={switchKey} />
      ) : (
        <CinematicGallery product={product} accent={accent} switchKey={switchKey} />
      )}
      <div className="product-floor pointer-events-none absolute bottom-6 h-16 w-2/3" />
    </div>
  );
}

/* ----------------------------- 360° spin mode ----------------------------- */

function Spin360({ product, switchKey }: { product: Product; switchKey: number }) {
  const frames = product.frames360!;
  const [index, setIndex] = useState(0);
  const dragState = useRef({ startX: 0, startIndex: 0, dragging: false });
  const [hint, setHint] = useState(true);

  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  const sensitivity = 6;

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startIndex: index, dragging: true };
    setHint(false);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const steps = Math.round(dx / sensitivity);
    const next =
      (((dragState.current.startIndex + steps) % frames.length) + frames.length) %
      frames.length;
    setIndex(next);
  }
  function onPointerUp() {
    dragState.current.dragging = false;
  }

  return (
    <motion.div
      key={switchKey}
      initial={{ opacity: 0, scale: 0.9, rotateY: -18 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateY: 18 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="cursor-grab-spin relative z-10 select-none"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frames[index]}
        alt={`${product.name} — view ${index + 1} of ${frames.length}`}
        draggable={false}
        className="h-[clamp(260px,42vw,560px)] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
      />
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs text-white/80"
          >
            ↔ drag to spin · 360°
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------- cinematic gallery mode ------------------------- */

function CinematicGallery({
  product,
  accent,
  switchKey,
}: {
  product: Product;
  accent: string;
  switchKey: number;
}) {
  const imgs = product.gallery?.length ? product.gallery : [product.image];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setI(0), [switchKey]);
  useEffect(() => {
    if (paused || imgs.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % imgs.length), 2600);
    return () => clearInterval(t);
  }, [paused, imgs.length, switchKey]);

  return (
    <div
      className="relative z-10 flex flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[clamp(260px,42vw,560px)] w-[clamp(260px,42vw,560px)]">
        <AnimatePresence mode="popLayout">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={`${switchKey}-${i}`}
            src={imgs[i]}
            alt={`${product.name} — angle ${i + 1}`}
            initial={{ opacity: 0, scale: 1.08, rotateZ: 1.5, y: 12 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, rotateZ: -1.5, y: -12 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {imgs.length > 1 && (
        <div className="mt-8 flex gap-2">
          {imgs.map((_, d) => (
            <button
              key={d}
              aria-label={`View angle ${d + 1}`}
              onClick={() => setI(d)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: d === i ? 24 : 8,
                background: d === i ? accent : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
