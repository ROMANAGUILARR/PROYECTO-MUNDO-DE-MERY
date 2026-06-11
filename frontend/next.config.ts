import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin/products",
        destination: "/admin/productos",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin/productos",
        destination: "/admin/products",
      },
    ];
  },
};

export default nextConfig;
