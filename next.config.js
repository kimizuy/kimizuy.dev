/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverComponentsExternalPackages: ["mdx-bundler"],
  },

  // fix error from budoux: "Module not found: Can't resolve 'canvas'"
  // ref: https://github.com/vercel/next.js/discussions/43465#discussioncomment-4256927
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
      // ref: https://github.com/vercel/next.js/issues/44273#issuecomment-1374989371
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
