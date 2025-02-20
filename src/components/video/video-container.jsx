import { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { Link } from "react-router-dom";
import { AdVideoCard } from "./ad-video";
import { YOUTUBE_VIDEOS_API } from "../../utils/constants";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(YOUTUBE_VIDEOS_API);

      if (!response.ok) throw new Error("Failed to fetch videos");

      const json = await response.json();

      if (json.items && Array.isArray(json.items)) {
        setVideos(json.items);
        setError(null);
      } else {
        setVideos([]);
        setError("No videos available");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError(err.message || "Something went wrong");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const shimmerLoader = (
    <div className="flex flex-wrap justify-center">
      {/* Shimmer Loader for Video Cards */}
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="m-2 w-64 h-96 bg-gray-200 animate-pulse rounded-lg shadow-lg"
        >
          <div className="h-48 bg-gray-300 rounded-t-lg"></div>
          <div className="h-8 mt-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-6 mt-2 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return shimmerLoader;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {error && (
        <p className="text-red-500 text-center w-full">Error: {error}</p>
      )}

      {videos.length > 0 && <AdVideoCard info={videos[0]} />}

      {videos.map((video) => {
        const videoId = video.id?.videoId || video.id; // Ensures correct ID usage
        return (
          <Link key={videoId} to={`/watch?v=${videoId}`} className="m-2">
            <VideoCard info={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
