const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // @ts-ignore
  images: {
    domains: ['pbs.twimg.com'],
  },

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],

  webpack: (config, options) => {
    // if (options.isServer) {
    //   const originalEntry = config.entry

    //   config.entry = async () => {
    //     const entries = { ...(await originalEntry()) }
    //     entries['./scripts/build-rss.js'] = './scripts/build-rss.tsx'

    //     return entries
    //   }
    // }

    // Replace React with Preact only in client production build
    if (!options.dev && !options.isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/feed.xml',
  //       destination: '/_next/static/feed.xml',
  //     },
  //   ]
  // },
}

module.exports = withBundleAnalyzer(nextConfig)
