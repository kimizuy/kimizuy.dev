/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    serverComponentsExternalPackages: ["budoux"],
  },
  async rewrites() {
    const oldBlogHost = {
      type: "host",
      value: "blog.kimizuy.dev",
    };
    return {
      beforeFiles: [
        // rewrite "blog.kimizuy.dev" to "kimizuy.dev/blog"
        {
          source: "/",
          has: [oldBlogHost],
          destination: "https://kimizuy.dev/blog",
        },
        {
          source: "/posts/:path*",
          has: [oldBlogHost],
          destination: "https://kimizuy.dev/blog/post/:path*",
        },
        {
          source: "/tags/:path*",
          has: [oldBlogHost],
          destination: "https://kimizuy.dev/blog/tag/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
