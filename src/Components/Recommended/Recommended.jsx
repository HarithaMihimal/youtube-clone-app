import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import './Recommended.css'
import { value_converter } from '../../Data'
import { Link } from 'react-router-dom'
import { getRecommended } from '../../lib/youtubeApi'

const RecommendedCard = memo(({ item }) => (
    <Link to={`/video/${item.snippet.categoryId}/${item.id}`}>
        <div className="recommended-card">
            <img loading="lazy" decoding="async" src={item.snippet.thumbnails.medium.url} alt="" />
            <p>{item.snippet.title}</p>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
        </div>
    </Link>
))

const Recommended = ({ categoryId }) => {
    const scrollRef = useRef(null)
    const { data = [], isPending, isError } = useQuery({
        queryKey: ['recommended', categoryId],
        queryFn: () => getRecommended(categoryId),
        enabled: Boolean(categoryId),
    })
    const virtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 116,
        overscan: 3,
    })

    return (
        <div className="recommended" ref={scrollRef}>
            {isPending && <p className="feed-message">Loading recommendations...</p>}
            {isError && <p className="feed-message">Unable to load recommendations.</p>}
            {data.length > 0 && (
                <div className="recommended-virtual-content" style={{ height: virtualizer.getTotalSize() }}>
                    {virtualizer.getVirtualItems().map((item) => (
                        <div className="recommended-virtual-row" key={item.key} ref={virtualizer.measureElement} data-index={item.index} style={{ transform: `translateY(${item.start}px)` }}>
                            <RecommendedCard item={data[item.index]} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Recommended
