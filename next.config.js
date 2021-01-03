/* eslint-disable func-names */
const { createLoader } = require('simple-functional-loader')

module.exports = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          resourceQuery: /rss/,
          use: [
            ...mdx,
            createLoader(function (src) {
              return this.callback(null, src)
            }),
          ],
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = [
                'import Post from "@/components/post"',
                'export { getStaticProps } from "@/lib/getStaticProps"',
                src,
                'export default (props) => <Post meta={meta} {...props} />',
              ].join('\n')

              return this.callback(null, content)
            }),
          ],
        },
      ],
    })

    if (!options.dev && options.isServer) {
      const originalEntry = config.entry

      config.entry = async () => {
        const entries = { ...(await originalEntry()) }
        entries['./scripts/build-rss.js'] = './scripts/build-rss.tsx'

        return entries
      }
    }

    return config
  },

  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/_next/static/feed.xml',
      },
    ]
  },
}
