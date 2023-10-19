/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    serverComponentsExternalPackages: ["budoux"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // rewrite "blog.kimizuy.dev" to "kimizuy.dev/blog"
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
