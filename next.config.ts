import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  // Gzip all responses
  compress: true,

  // Source maps only bloat the client bundle in production
  productionBrowserSourceMaps: false,

  // Next.js image optimizer: serve modern formats (avif → webp → jpg)
  // and only generate the sizes we actually use
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },

  experimental: {
    // Tree-shake these icon/chart libraries at module level.
    // Without this, Next.js bundles the entire lucide-react (~2MB) and
    // recharts even though we import a fraction of each.
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

export default nextConfig;
