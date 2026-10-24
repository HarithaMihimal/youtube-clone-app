const API_BASE_URL = 'https://youtube.googleapis.com/youtube/v3'

const fetchYouTube = async (path) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const response = await fetch(`${API_BASE_URL}/${path}&key=${apiKey}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || 'Unable to load YouTube data.')
  }

  return data
}

export const getFeed = async ({ category, searchQuery }) => {
  const categoryParam = category ? `&videoCategoryId=${category}` : ''
  const endpoint = searchQuery
    ? `search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(searchQuery)}`
    : `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US${categoryParam}`
  const response = await fetchYouTube(endpoint)

  return searchQuery
    ? response.items?.map((item) => ({
        ...item,
        id: item.id.videoId,
        snippet: { ...item.snippet, categoryId: '0' },
      })) || []
    : response.items || []
}

export const getRecommended = async (categoryId) => {
  const response = await fetchYouTube(
    `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=40&videoCategoryId=${categoryId}`,
  )
  return response.items || []
}

export const getVideo = (videoId) => fetchYouTube(
  `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`,
).then((response) => response.items?.[0] || null)

export const getChannel = (channelId) => fetchYouTube(
  `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`,
).then((response) => response.items?.[0] || null)

export const getComments = (videoId) => fetchYouTube(
  `commentThreads?part=snippet%2Creplies&maxResults=10&videoId=${videoId}`,
).then((response) => response.items || [])
