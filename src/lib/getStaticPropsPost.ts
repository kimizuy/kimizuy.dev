import { GetStaticProps } from 'next'
import { getAllPostPreviews } from './getAllPostPreviews'

export const getStaticPropsPost: GetStaticProps = async () => {
  return {
    props: {
      posts: getAllPostPreviews().map(({ link, module: { meta } }) => ({
        title: meta.title,
        link,
      })),
    },
  }
}
