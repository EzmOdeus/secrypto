/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // لو عايز تستخدمها
  },
  serverExternalPackages: [],

  images: {
    domains: ["assets.coingecko.com"],
  },
  reactStrictMode: true,
  trailingSlash: false,
};
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,
});

module.exports = nextConfig;
