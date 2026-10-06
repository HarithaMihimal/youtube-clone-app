import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { value_converter } from '../../Data'
import { Link } from 'react-router-dom'


const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const fetchRecommendedData = async () => {
        const recommendedDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=40&videoCategoryId=${categoryId}&key=${apiKey}`;
        await fetch(recommendedDetails_url)
            .then((res) => res.json())
            .then((data) => {
                setApiData(data.items || []);
            })
            .catch((err) => {
                console.error('Unable to load recommended videos:', err);
                setApiData([]);
            });
    }

    useEffect(() => {
        fetchRecommendedData();
    }, [categoryId]);

    return (
        <div className='recommended'>


            {apiData.map((item, index) => {
                // link the videoId to the video page
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index}>
                        <div className='recommended-card'>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <p>{item.snippet.title}</p>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Recommended
