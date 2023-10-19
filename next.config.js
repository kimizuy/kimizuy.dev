/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    serverComponentsExternalPackages: ["budoux"],
  },
};

module.exports = nextConfig;
