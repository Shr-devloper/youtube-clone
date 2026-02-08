import { useNavigate } from "react-router-dom";
import "../styles/videocard.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div className="video-card" onClick={() => navigate(`/video/${video._id}`)}>
      <img src={video.thumbnailUrl} alt={video.title} />
      <div className="video-info">
        <h4>{video.title}</h4>
        <p>{video.channel?.channelName}</p>
        <p className="meta">2 months ago</p>
      </div>
    </div>
  );
};

export default VideoCard;
