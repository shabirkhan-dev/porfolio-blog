import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "motion",
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
    ],
  },
};

export default nextConfig;
