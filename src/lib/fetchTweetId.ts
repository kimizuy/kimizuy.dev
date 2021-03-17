import fetch from 'node-fetch'

const TOKEN = process.env.TWITTER_BEARER_TOKEN

const TWITTER_ID = '706822591617445888'
const url = `https://api.twitter.com/2/users/${TWITTER_ID}/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=5`

export const fetchTweetId = async (): Promise<string> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json())
    const [latestTweet] = response.data
    const tweetId = latestTweet.id

    return tweetId
  } catch (err) {
    console.error('error fetching tweet id', err)

    throw err
  }
}
