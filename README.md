# Curated Finds — cinematic Amazon affiliate showcase

A Next.js + Framer Motion storefront for affiliate marketing. Pinterest traffic
lands here, browses products by category, spins featured items in cinematic 360°
(with a multi-angle gallery fallback), and clicks through to Amazon via tagged
affiliate links.

Built with the **ui-ux-pro-max** design system: Liquid Glass style, premium
black + gold palette, Playfair Display + Inter typography.

---

## ▶️ Run it on GitHub (Codespaces — no local setup)

1. Push this repo to GitHub (see below).
2. On the repo page click **`< > Code` → Codespaces → Create codespace on main**.
3. The container installs deps and starts the dev server automatically. When the
   **port 3000** notification appears, click **Open in Browser**.

> The `.devcontainer/` config handles Node, `npm install`, and `npm run dev`.

## 💻 Run it locally

Requires Node.js 18.17+ (Node 22 recommended).

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## 🚀 Deploy (free)

Easiest is **Vercel** (made by the Next.js team):

1. Push to GitHub.
2. Go to https://vercel.com/new, import this repo, click **Deploy**. Done — no
   config needed.

---

## ✏️ Add YOUR products

Everything is driven by one file: **`data/catalog.ts`**.

1. Set your Amazon Associates tag:
   ```ts
   export const DEFAULT_TAG = "your-tag-20";
   ```
2. Edit the `seed` lists (grouped by category). Each entry is
   `[name, description, opts?]`:
   ```ts
   ["Wireless Earbuds", "Immersive ANC sound.", {
     affiliateUrl: "https://www.amazon.com/dp/XXXXXXXX?tag=your-tag-20",
     image: "https://m.media-amazon.com/images/I/XXXX.jpg",
     featured: true,            // show in the cinematic 360 showcase
   }],
   ```
3. Images can be **local** (put files in `public/products/...`, reference
   `/products/...`) or **remote Amazon URLs** (allowed hosts are configured in
   `next.config.mjs` — add hosts there if needed).

### True 360° spin (per product)

Drop a rotation frame set (24–72 photos around the object) into
`public/products/<id>/`, then add `frames360` to that product's `opts`:

```ts
frames360: ["/products/my-id/0001.jpg", "/products/my-id/0002.jpg", /* ... */],
```

If `frames360` has >1 image the showcase becomes **drag-to-spin 360°**;
otherwise it cinematically cross-fades the `gallery` / poster image.

---

## 🧩 Project structure

```
app/            # Next.js App Router (layout, page, globals.css)
components/      # Hero, FeaturedShowcase, ProductGrid, ProductCard,
                #   CategoryNav, Product360Viewer, AffiliateButton
data/catalog.ts # ← your categories + products live here
lib/types.ts    # Category / Product types
public/products/# product images / 360 frame sets
```

## ✅ Affiliate compliance

- Affiliate links use `rel="nofollow sponsored noopener"`.
- The required Amazon Associate disclosure is shown in the footer and near each
  buy button — keep it (program requirement).

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
