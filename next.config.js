const OLD_BLOG_HOST = {
  type: "host",
  value: "blog.kimizuy.dev",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    serverComponentsExternalPackages: ["budoux"],
  },
  // redirect "blog.kimizuy.dev" to "kimizuy.dev/blog"
  async redirects() {
    return [
      {
        source: "/",
        has: [OLD_BLOG_HOST],
        destination: "https://kimizuy.dev/blog",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/posts/:path*",
          has: [OLD_BLOG_HOST],
          destination: "https://kimizuy.dev/blog/post/:path*",
        },
        {
          source: "/tags/:path*",
          has: [OLD_BLOG_HOST],
          destination: "https://kimizuy.dev/blog/tag/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
