import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // há um package-lock.json na pasta do usuário; fixa a raiz neste projeto
  turbopack: { root: process.cwd() },
};

export default nextConfig;
