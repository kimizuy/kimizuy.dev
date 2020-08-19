import getAllPostPreviews from './getAllPostPreviews'

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPostPreviews().map((post) => ({
        title: post.meta.title,
        link: post.link,
      })),
    },
  }
}
