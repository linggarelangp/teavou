import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  allowedDevOrigins: [
    "192.168.123.35",
    "https://teavou.vercel.app",
    "https://eb06-27-124-95-195.ngrok-free.app",
  ],
};

export default nextConfig;
