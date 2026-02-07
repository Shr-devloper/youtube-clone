import { useNavigate } from "react-router-dom";
import "../styles/video.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div
      className="video-card"
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <img src={video.thumbnailUrl} alt={video.title} />
      <h4>{video.title}</h4>
      <p>{video.channel?.channelName}</p>
      <p>{video.views} views</p>
    </div>
  );
};

export default VideoCard;
