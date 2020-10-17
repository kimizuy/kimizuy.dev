import getAllPostPreviews from './getAllPostPreviews'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async () => {
  return {
    props: {
      posts: getAllPostPreviews().map((post) => ({
        title: post.meta.title,
        link: post.link,
      })),
    },
  }
}
