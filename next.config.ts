import type { NextConfig } from "next";

// GitHub Pages project site: https://<user>.github.io/<repo>/
// basePath is injected at build time via NEXT_BASE_PATH (see .github/workflows/deploy.yml).
// NEXT_PUBLIC_BASE_PATH mirrors it for client-side raw asset URLs (e.g. <video src>).
// Locally both stay empty so `npm run dev` works at http://localhost:3000/.
const rawBasePath = (process.env.NEXT_BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");
const basePath = rawBasePath ? `/${rawBasePath}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  // Required so <Image> and static assets resolve under /<repo>/ on Pages.
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
