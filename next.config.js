/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["budoux"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://kimizuy.dev/blog",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
