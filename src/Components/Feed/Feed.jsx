import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import './Feed.css'
import { Link } from 'react-router-dom'
import { value_converter } from '../../Data'
import moment from 'moment'
import { getFeed } from '../../lib/youtubeApi'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

const FeedCard = memo(({ item }) => {
    const viewCount = item.statistics?.viewCount
    return (
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <img loading="lazy" decoding="async" src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{viewCount ? `${value_converter(viewCount)} views` : 'Search result'} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
    )
})

const Feed = ({ category, searchQuery }) => {
    const debouncedSearchQuery = useDebouncedValue(searchQuery)
    const feedRef = useRef(null)
    const [columns, setColumns] = useState(1)
    const { data = [], isPending, isError } = useQuery({
        queryKey: ['feed', category, debouncedSearchQuery],
        queryFn: () => getFeed({ category, searchQuery: debouncedSearchQuery }),
        placeholderData: (previousData) => previousData,
    })

    useEffect(() => {
        const element = feedRef.current
        if (!element) return undefined
        const updateColumns = () => setColumns(Math.max(1, Math.floor(element.clientWidth / 268)))
        updateColumns()
        const observer = new ResizeObserver(updateColumns)
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    const rows = useMemo(() => {
        const grouped = []
        for (let index = 0; index < data.length; index += columns) {
            grouped.push(data.slice(index, index + columns))
        }
        return grouped
    }, [data, columns])
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => feedRef.current,
        estimateSize: () => 280,
        overscan: 2,
    })

    return (
        <div className="feed" ref={feedRef}>
            {(isPending && data.length === 0) && <p className="feed-message">Loading videos...</p>}
            {isError && <p className="feed-message">Unable to load videos right now. Please try again.</p>}
            {!isPending && !isError && data.length === 0 && <p className="feed-message">No videos found.</p>}
            {data.length > 0 && (
                <div className="feed-virtual-content" style={{ height: rowVirtualizer.getTotalSize() }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <div
                            className="feed-row"
                            key={virtualRow.key}
                            ref={rowVirtualizer.measureElement}
                            data-index={virtualRow.index}
                            style={{ transform: `translateY(${virtualRow.start}px)`, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                        >
                            {rows[virtualRow.index].map((item) => <FeedCard key={item.id} item={item} />)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Feed
