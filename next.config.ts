import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wezoree.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bellanaijaweddings.com",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
