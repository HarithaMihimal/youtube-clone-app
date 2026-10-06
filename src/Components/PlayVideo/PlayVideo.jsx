// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import './PlayVideo.css'

import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import haritha from '../../assets/haritha.png'
import user_profile from '../../assets/user_profile.jpg'
import { value_converter } from '../../Data'
import moment from 'moment'

const Comment = ({ comment }) => {
    const commentSnippet = comment?.snippet?.topLevelComment?.snippet

    if (!commentSnippet) return null

    return (
        <article className="comment">
            <img src={commentSnippet.authorProfileImageUrl || user_profile} alt="" />
            <div>
                <h3>
                    {commentSnippet.authorDisplayName}
                    <span>{moment(commentSnippet.publishedAt).fromNow()}</span>
                </h3>
                <p dangerouslySetInnerHTML={{ __html: commentSnippet.textDisplay || '' }} />
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{value_converter(commentSnippet.likeCount) || "0"}</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </article>
    )
}

const PlayVideo = ({ videoId }) => {

    const [apiData, setApiData] = React.useState(null);
    const [channelData, setChannelData] = React.useState(null);
    const [commentData, setCommentData] = React.useState(null);
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

    // https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY] HTTP/1.1


    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;
        await fetch(videoDetails_url)
            .then((res) => res.json())
            .then((data) => {
                setApiData(data.items[0]);
            })
            .catch((err) => console.log(err));
    }


    const fetchOtherData = async () => {
        const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${apiKey}`;
        await fetch(channelDetails_url)
            .then((res) => res.json())
            .then((data) => {
                setChannelData(data.items[0]);
            })
            .catch((err) => console.log(err));
    }

    const fetchCommentData = async () => {
        const commentDetails_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=10&videoId=${videoId}&key=${apiKey}`;
        await fetch(commentDetails_url)
            .then((res) => res.json())
            .then((data) => {
                setCommentData(data.items);
            })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        fetchOtherData();
    }, [apiData]);

    useEffect(() => {
        fetchCommentData();
    }, [apiData]);

    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <h3>{apiData?.snippet?.title || "No Title"}</h3>
            <div className="play-video-info">
                <p>{value_converter(apiData?.statistics?.viewCount) || "0"} Views &bull; {apiData?.snippet?.publishedAt ? moment(apiData.snippet.publishedAt).fromNow() : "Unknown"}</p>
                <div>
                    <span><img src={like} alt="" />{value_converter(apiData?.statistics?.likeCount) || "0"}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?.snippet?.thumbnails?.default?.url || user_profile} alt="" />
                <div>
                    <p>{apiData?.snippet?.channelTitle || "Unknown Channel"}</p>
                    <span>{value_converter(channelData?.statistics?.subscriberCount) || "0"} subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?.snippet?.description.slice(0, 200) + '...' || "No description available"}</p>
                <hr />
                <h4>{value_converter(apiData?.statistics?.commentCount) || "0"} Comments</h4>
                <div className="comments">
                    {commentData?.length ? (
                        commentData.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <p>No comments available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlayVideo
