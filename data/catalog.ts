import { Category, CategoryId, Product } from "@/lib/types";

/**
 * ──────────────────────────────────────────────────────────────────────────
 *  YOUR CATALOG.
 *
 *  CATEGORIES are fixed below. PRODUCTS are generated from the compact lists
 *  in `seed` — each tuple is [name, description, opts?].
 *
 *  To use your REAL products:
 *   - replace `affiliateUrl` (set DEFAULT_TAG or pass per-item) and `image`.
 *   - for true 360° on a product, add `frames360: [...]` in the opts object and
 *     drop frames into public/products/<id>/.
 *   - mark a few `featured: true` to surface them in the cinematic showcase.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const DEFAULT_TAG = "YOUR-AFFILIATE-TAG"; // <-- your Amazon Associates tag

export const categories: Category[] = [
  {
    id: "clothing",
    name: "Clothing & Apparel",
    blurb: "Everyday staples to standout statement pieces.",
    accent: "#E7C87A", // warm gold
  },
  {
    id: "electronics",
    name: "Electronic Gadgets",
    blurb: "Sound, capture, and power for modern life.",
    accent: "#7C5CFF", // electric violet
  },
  {
    id: "home-decor",
    name: "Home Decor",
    blurb: "Pieces that make a space feel like yours.",
    accent: "#48D6A8", // teal
  },
  {
    id: "health",
    name: "Health & Skincare",
    blurb: "Glow-up essentials your routine will love.",
    accent: "#FF8FA3", // rose
  },
];

type Opts = Partial<
  Pick<Product, "affiliateUrl" | "image" | "gallery" | "frames360" | "featured" | "price">
>;
type Seed = [name: string, description: string, opts?: Opts];

const seed: Record<CategoryId, Seed[]> = {
  clothing: [
    ["Shirts", "Crisp button-downs for work and weekend."],
    ["T-Shirts", "Soft, breathable everyday tees."],
    ["Pants", "Tailored fits that move with you."],
    ["Trousers", "Smart trousers with a clean drape."],
    ["Shoes", "Step-out sneakers and classics.", { featured: true }],
    ["Jackets", "Layer up with structure and warmth."],
    ["Hoodies", "Cozy fleece for off-duty days."],
    ["Caps", "Finish the fit with a clean cap."],
    ["Sweatshirts", "Heavyweight comfort, all season."],
    ["Shorts", "Lightweight and ready for warm days."],
  ],
  electronics: [
    ["Earphones", "Immersive sound, all-day comfort.", { featured: true }],
    ["Speakers", "Room-filling audio, anywhere."],
    ["Microphones", "Studio-clear voice for creators."],
    ["Web Cameras", "Sharp, true-to-life video calls."],
    ["Cameras", "Capture moments in stunning detail."],
    ["GoPro & Action Cams", "Adventure-proof, cinematic footage."],
    ["Mobile Cases", "Slim protection with style."],
    ["Chargers", "Fast, reliable everyday power."],
    ["Power Banks", "Top up on the go, never run flat."],
    ["Watches", "Smart on the wrist, sharp on the eye."],
  ],
  "home-decor": [
    ["Clocks", "Statement timepieces for any wall."],
    ["Decoration Items", "Little accents, big personality."],
    ["Wall Paintings", "Art that anchors the room.", { featured: true }],
    ["Table Essentials", "Curated pieces for your surfaces."],
    ["Lamps", "Warm, moody, beautiful light."],
    ["Mini Projectors", "Movie night, anywhere you like."],
    ["Fancy Table Fans", "Cool air with retro charm."],
    ["Cool Hangers", "Organize in style."],
    ["Vintage Stamps", "Collectible history, framed."],
    ["Hot Wheels & Car Toys", "Die-cast classics for collectors."],
    ["Anime Wall Art", "Bold prints for fans."],
  ],
  health: [
    ["Sunscreen", "Lightweight, no-residue daily SPF."],
    ["Moisturisers", "All-day hydration that sinks in."],
    ["Face Wash", "Gentle, deep-clean refresh."],
    ["Serums", "Targeted glow in every drop.", { featured: true }],
    ["Conditioners", "Soft, manageable, salon-smooth hair."],
    ["Lip Balms", "Nourish and protect, naturally."],
    ["De-Tan Soaps", "Even-tone, refreshed skin."],
  ],
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = Object.entries(seed).flatMap(
  ([category, items]) =>
    items.map(([name, description, opts], i) => {
      const id = `${category}-${slug(name)}`;
      return {
        id,
        name,
        category: category as CategoryId,
        description,
        affiliateUrl:
          opts?.affiliateUrl ??
          `https://www.amazon.com/s?k=${encodeURIComponent(
            name
          )}&tag=${DEFAULT_TAG}`,
        image:
          opts?.image ?? `https://picsum.photos/seed/${id}-${i}/900/1100`,
        gallery: opts?.gallery,
        frames360: opts?.frames360,
        featured: opts?.featured,
        price: opts?.price,
      } satisfies Product;
    })
);

export const featuredProducts = products.filter((p) => p.featured);

export function productsByCategory(category: CategoryId | "all"): Product[] {
  return category === "all"
    ? products
    : products.filter((p) => p.category === category);
}

export const accentFor = (category: CategoryId) =>
  categories.find((c) => c.id === category)?.accent ?? "#E7C87A";
