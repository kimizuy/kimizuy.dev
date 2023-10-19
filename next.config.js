/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["budoux"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "https://kimizuy.dev/blog",
      },
      {
        source: "/:path*",
        destination: "https://kimizuy.dev/blog/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
