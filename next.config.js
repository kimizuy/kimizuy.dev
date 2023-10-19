/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["budoux"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "blog.kimizuy.dev",
            },
          ],
          destination: "/blog/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
