/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    serverComponentsExternalPackages: ["budoux"],
  },
  ...redirectBlog(),
};

module.exports = nextConfig;

/**
 * Redirect `blog.kimizuy.dev` to `kimizuy.dev/blog`
 */
function redirectBlog() {
  const OLD_BLOG_HOST = {
    type: "host",
    value: "blog.kimizuy.dev",
  };
  /** @type {import('next').NextConfig} */
  const config = {
    // async redirects() {
    //   return [
    //     {
    //       source: "/",
    //       has: [OLD_BLOG_HOST],
    //       destination: "https://kimizuy.dev/blog",
    //       permanent: true,
    //     },
    //   ];
    // },
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

  return config;
}
