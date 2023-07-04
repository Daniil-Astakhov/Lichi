/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["static.lichi.com"],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.lichi.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
