import PropTypes from "prop-types";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

VideoCard.propTypes = {
  info: PropTypes.shape({
    snippet: PropTypes.shape({
      channelTitle: PropTypes.string,
      title: PropTypes.string,
      thumbnails: PropTypes.shape({
        medium: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
    statistics: PropTypes.shape({
      viewCount: PropTypes.string,
    }),
  }).isRequired,
};

export default VideoCard;
