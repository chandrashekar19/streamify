import VideoCard from "./video-card";
import PropTypes from "prop-types";

export const AdVideoCard = ({ info }) => {
  return (
    <div className="p-1 m-1 border border-red-900 ">
      <VideoCard info={info} />
    </div>
  );
};

AdVideoCard.propTypes = {
  info: PropTypes.object.isRequired,
};
