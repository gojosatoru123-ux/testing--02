import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure fs-dependent modules are never bundled for the browser
  serverExternalPackages: [],

  // Output standalone for deployment (Vercel/Docker)
  // output: 'standalone', // uncomment if deploying to Docker

  // Strict mode
  reactStrictMode: true,

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
