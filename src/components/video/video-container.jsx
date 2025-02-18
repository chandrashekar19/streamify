import React, { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { Link } from "react-router-dom";
import { AdVideoCard } from "./ad-video";
import { YOUTUBE_VIDEOS_API } from "../../utils/constants";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEOS_API);
      console.log("response", response);
      if (!response.ok) throw new Error("Failed to fetch videos");

      const json = await response.json();
      if (json.items && Array.isArray(json.items)) {
        setVideos(json.items);
      } else {
        setVideos([]);
        setError("No videos available");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError(err.message);
      setVideos([]);
    }
  };

  return (
    <div className="flex flex-wrap">
      {error && <p className="text-red-500">Error: {error}</p>}
      {videos.length > 0 && <AdVideoCard info={videos[0]} />}
      {videos.map((video) => (
        <Link key={video.id} to={`/watch?v=${video.id}`}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
