import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [], // laisse vide si images locales
        unoptimized: true,  // force le rendu local
    },
};

export default nextConfig;
