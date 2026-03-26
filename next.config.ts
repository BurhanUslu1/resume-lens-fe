import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Docker / Azure Container Apps deployment
  // Produces a minimal self-contained server in .next/standalone
  output: "standalone",
  webpack: (config, { dev }) => {
    // Enable hot reloading in development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
