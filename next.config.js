// @ts-check
const { createLoader } = require('simple-functional-loader')
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
    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        // {
        //   resourceQuery: /rss/,
        //   use: mdx,
        // },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = [
                'import { Post } from "@/components/post"',
                'export { getStaticPropsPost } from "@/lib/getStaticPropsPost"',
                src,
                'export default (props) => <Post meta={meta} {...props} />',
              ].join('\n')

              return this.callback(null, content)
            }),
          ],
        },
      ],
    })

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
