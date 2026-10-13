// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { value_converter } from '../../Data'
import moment from 'moment'

const Feed = ({ category, searchQuery }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError('')
        const categoryParam = category ? `&videoCategoryId=${category}` : ''
        const endpoint = searchQuery
            ? `search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(searchQuery)}`
            : `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US${categoryParam}`
        const videoListUrl = `https://youtube.googleapis.com/youtube/v3/${endpoint}&key=${apiKey}`

        try {
            const response = await fetch(videoListUrl)
            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.error?.message || 'Unable to load videos.')

            const items = searchQuery
                ? responseData.items?.map((item) => ({
                    ...item,
                    id: item.id.videoId,
                    snippet: { ...item.snippet, categoryId: '0' },
                }))
                : responseData.items
            setData(items || [])
        } catch (fetchError) {
            console.error('Unable to load videos:', fetchError)
            setData([])
            setError('Unable to load videos right now. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }, [category, searchQuery, apiKey])

    useEffect(() => {
        const timeoutId = setTimeout(fetchData, 0)
        return () => clearTimeout(timeoutId)
    }, [fetchData])

    return (
        <div className="feed">
            {isLoading && <p className="feed-message">Loading videos...</p>}
            {!isLoading && error && <p className="feed-message">{error}</p>}
            {!isLoading && !error && data.length === 0 && <p className="feed-message">No videos found.</p>}
            {data.map((item) => {
                const viewCount = item.statistics?.viewCount
                return (
                    <Link key={item.id} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{viewCount ? `${value_converter(viewCount)} views` : 'Search result'} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed
