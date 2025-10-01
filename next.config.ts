import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "imljzgcuelzzzncfzlnc.supabase.co",
      },
    ],
  },

  eslint: {
    // ✅ This allows production builds to succeed even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
