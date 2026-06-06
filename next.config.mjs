/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Amazon product image CDNs + common hosts. Add your image hosts here.
    remotePatterns: [
      { protocol: "https", hostname: "**.media-amazon.com" },
      { protocol: "https", hostname: "**.ssl-images-amazon.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      // Placeholder demo images — remove when you swap in real product photos.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
