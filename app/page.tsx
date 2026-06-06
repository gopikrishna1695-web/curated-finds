import Hero from "@/components/Hero";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import ProductGrid from "@/components/ProductGrid";
import { categories, products, featuredProducts } from "@/data/catalog";

export default function Home() {
  return (
    <main className="stage-vignette min-h-screen">
      <Hero />
      <FeaturedShowcase products={featuredProducts} categories={categories} />
      <ProductGrid categories={categories} products={products} />

      <footer className="border-t border-white/5 px-6 py-12 text-center text-sm text-white/40">
        <p className="mx-auto max-w-2xl">
          As an Amazon Associate, this site earns from qualifying purchases.
          Prices and availability are accurate as of the date/time shown on
          Amazon and are subject to change.
        </p>
        <p className="mt-3">© {new Date().getFullYear()} Curated Finds</p>
      </footer>
    </main>
  );
}
