import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MAINTENANCE_MODE: process.env.MAINTENANCE_MODE || "false",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
