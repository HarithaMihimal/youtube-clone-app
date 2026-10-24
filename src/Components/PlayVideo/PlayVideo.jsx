import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import user_profile from '../../assets/user_profile.jpg'
import { value_converter } from '../../Data'
import moment from 'moment'
import { getChannel, getComments, getVideo } from '../../lib/youtubeApi'

const Comment = memo(({ comment }) => {
    const commentSnippet = comment?.snippet?.topLevelComment?.snippet
    if (!commentSnippet) return null

    return (
        <article className="comment">
            <img loading="lazy" decoding="async" src={commentSnippet.authorProfileImageUrl || user_profile} alt="" />
            <div>
                <h3>{commentSnippet.authorDisplayName}<span>{moment(commentSnippet.publishedAt).fromNow()}</span></h3>
                <p dangerouslySetInnerHTML={{ __html: commentSnippet.textDisplay || '' }} />
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{value_converter(commentSnippet.likeCount) || '0'}</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </article>
    )
})

const PlayVideo = ({ videoId }) => {
    const { data: apiData } = useQuery({
        queryKey: ['video', videoId],
        queryFn: () => getVideo(videoId),
        enabled: Boolean(videoId),
    })
    const { data: channelData } = useQuery({
        queryKey: ['channel', apiData?.snippet?.channelId],
        queryFn: () => getChannel(apiData.snippet.channelId),
        enabled: Boolean(apiData?.snippet?.channelId),
    })
    const { data: commentData = [] } = useQuery({
        queryKey: ['comments', videoId],
        queryFn: () => getComments(videoId),
        enabled: Boolean(videoId),
    })

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
            <h3>{apiData?.snippet?.title || 'No Title'}</h3>
            <div className="play-video-info">
                <p>{value_converter(apiData?.statistics?.viewCount) || '0'} Views &bull; {apiData?.snippet?.publishedAt ? moment(apiData.snippet.publishedAt).fromNow() : 'Unknown'}</p>
                <div>
                    <span><img src={like} alt="" />{value_converter(apiData?.statistics?.likeCount) || '0'}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img loading="lazy" decoding="async" src={channelData?.snippet?.thumbnails?.default?.url || user_profile} alt="" />
                <div>
                    <p>{apiData?.snippet?.channelTitle || 'Unknown Channel'}</p>
                    <span>{value_converter(channelData?.statistics?.subscriberCount) || '0'} subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?.snippet?.description ? `${apiData.snippet.description.slice(0, 200)}...` : 'No description available'}</p>
                <hr />
                <h4>{value_converter(apiData?.statistics?.commentCount) || '0'} Comments</h4>
                <div className="comments">
                    {commentData.length ? commentData.map((comment) => <Comment key={comment.id} comment={comment} />) : <p>No comments available</p>}
                </div>
            </div>
        </div>
    )
}

export default PlayVideo
