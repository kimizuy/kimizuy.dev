/* eslint-disable func-names */
const { createLoader } = require('simple-functional-loader')
const rehypePrism = require('@mapbox/rehype-prism')

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
        options: {
          rehypePlugins: [rehypePrism],
        },
      },
    ]

    config.module.rules.push({
      test: /\.mdx$/,
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
    })

    if (!options.dev && options.isServer) {
      const originalEntry = config.entry

      config.entry = async () => {
        const entries = { ...(await originalEntry()) }
        entries['./scripts/build-rss'] = './scripts/build-rss'
        return entries
      }
    }

    return config
  },
}
