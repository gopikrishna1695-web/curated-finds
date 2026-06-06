export type CategoryId = "clothing" | "electronics" | "home-decor" | "health";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  /** Accent color (hex) for the category's glass tint + glow */
  accent: string;
};

export type Product = {
  /** Unique slug, used for keys + URLs */
  id: string;
  name: string;
  category: CategoryId;
  /** Short, enticing line */
  description: string;
  /** Optional price label — usually best OMITTED (Amazon prices change) */
  price?: string;
  /** Your Amazon AFFILIATE (tagged) link */
  affiliateUrl: string;

  /** Poster image (card + showcase hero). Local /products/... or Amazon URL. */
  image: string;

  /**
   * Extra angle photos for the cinematic cross-fade gallery in the showcase.
   * Defaults to [image] if omitted.
   */
  gallery?: string[];

  /**
   * 360° rotation frames in order (24/36/72 imgs). If length > 1, the showcase
   * viewer becomes drag-to-spin 360°. Put files in public/products/<id>/.
   */
  frames360?: string[];

  /** Surface this product in the cinematic Featured showcase at the top. */
  featured?: boolean;
};
