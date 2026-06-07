/** @type {import('next').NextConfig} */

// Repo name — used as the base path when hosted on GitHub Pages
// (served at https://<user>.github.io/<repo>/).
const repo = "curated-finds";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Produce a fully static site in ./out for GitHub Pages.
  output: "export",
  // Serve correctly from the /curated-finds/ subpath in production only,
  // so local `npm run dev` still works at the root.
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
  images: {
    // Required for static export (no Next image optimization server).
    unoptimized: true,
  },
};

export default nextConfig;
