import { NextApiRequest, NextApiResponse } from 'next'
import { fetchTweet } from '@/lib/fetchTweet'

const tweetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const tweet = await fetchTweet()
  res.status(200).json(tweet)
}

// eslint-disable-next-line import/no-default-export
export default tweetHandler
