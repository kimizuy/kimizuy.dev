import { getAllPostPreviews } from './getAllPostPreviews'

export const getStaticProps = async () => {
  return {
    props: {
      posts: getAllPostPreviews().map(({ link, module: { meta } }) => ({
        title: meta.title,
        link,
      })),
    },
  }
}
