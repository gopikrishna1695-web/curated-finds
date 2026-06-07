# Curated Finds — my cinematic affiliate storefront

This repository **is my website** — the full source code for a cinematic,
animated Amazon affiliate storefront. Visitors come in from Pinterest, browse
products by category, spin featured items in 360°, and click through to Amazon.

Built with **Next.js + Framer Motion**, designed with the **ui-ux-pro-max**
system (Liquid Glass style, premium black + gold, Playfair Display + Inter).

> 📁 **The website lives in the folders below.** Click any file on GitHub to read
> or edit the code. This README is just the cover page.

---

## 🗺️ Where everything is (the website's code)

| I want to change… | Open this file |
|---|---|
| **My products** (names, descriptions, images, Amazon links, categories) | **`data/catalog.ts`** ← edit this most |
| The homepage layout / section order | `app/page.tsx` |
| The hero / headline at the top | `components/Hero.tsx` |
| The big cinematic 360° product viewer | `components/FeaturedShowcase.tsx` + `components/Product360Viewer.tsx` |
| The product cards in the grid | `components/ProductCard.tsx` |
| The category filter tabs | `components/CategoryNav.tsx` + `components/ProductGrid.tsx` |
| The "View on Amazon" button | `components/AffiliateButton.tsx` |
| **Colors, fonts, glass look** | `tailwind.config.ts` and `app/globals.css` |
| The page title / SEO description | `app/layout.tsx` |

```
app/         → pages & global styles (Next.js App Router)
components/   → every visual piece of the site
data/         → my catalog: categories + products  ← start here
lib/          → shared TypeScript types
public/       → product images & 360° frame sets
```

---

## ✏️ How to make changes

**Easiest (right in the browser, no setup):**
- On GitHub, open a file → click the **pencil ✏️ icon** → edit → **Commit changes**.
- Or press **`.`** (period) on the repo page to open the full VS Code web editor.

**On your computer:**
```bash
git clone https://github.com/gopikrishna1695-web/curated-finds.git
cd curated-finds
npm install
npm run dev        # preview at http://localhost:3000
```
Edit files, save, and the browser updates live. When happy:
```bash
git add -A && git commit -m "Update products" && git push
```

### Add / edit my products

Everything is in **`data/catalog.ts`**:

1. Set my Amazon Associates tag once: `export const DEFAULT_TAG = "my-tag-20";`
2. Each product is one line — `[name, description, options]`:
   ```ts
   ["Wireless Earbuds", "Immersive ANC sound.", {
     affiliateUrl: "https://www.amazon.com/dp/XXXXXXXX?tag=my-tag-20",
     image: "https://m.media-amazon.com/images/I/XXXX.jpg",
     featured: true,          // show in the big 360° showcase
   }],
   ```
3. For a true **360° spin**, drop rotation frames into `public/products/<id>/`
   and add `frames360: ["/products/<id>/0001.jpg", ...]` to that product.

---

## 👀 See it live (deploy)

The code here is the blueprint — to get a public web address people can visit,
deploy it (free):

- **Vercel** (recommended for Next.js): go to <https://vercel.com/new>, import
  this repo, click **Deploy**. You get a URL like `curated-finds.vercel.app`.
  After that, **every `git push` auto-updates the live site.**
- **GitHub Codespaces**: repo → `< > Code` → Codespaces → *Create codespace* to
  run it in your browser (preconfigured in `.devcontainer/`).

---

## ✅ Affiliate compliance

Affiliate links use `rel="nofollow sponsored noopener"`, and the required Amazon
Associate disclosure appears in the footer and near each buy button.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
