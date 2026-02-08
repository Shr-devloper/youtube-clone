import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/comments.css";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  // ✅ ALL hooks INSIDE component
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [effect, setEffect] = useState(null);

  // 🔹 Fetch video + comments
  useEffect(() => {
    const fetchData = async () => {
      const videoRes = await api.get(`/videos/${id}`);
      setVideo(videoRes.data);

      const commentRes = await api.get(`/comments/${id}`);
      setComments(commentRes.data);

      if (
        user &&
        Array.isArray(videoRes.data.channel?.subscribers) &&
        videoRes.data.channel.subscribers.includes(user.id)
      ) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
    };

    fetchData();
  }, [id, user]);

  // 🔹 Fetch recommendations
  useEffect(() => {
    api.get("/videos").then((res) => {
      setRecommendations(res.data.filter((v) => v._id !== id));
    });
  }, [id]);

  // 👍 LIKE
  const handleLike = async () => {
    setEffect("like");
    const res = await api.put(
      `/videos/${id}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setVideo(res.data);
    setTimeout(() => setEffect(null), 300);
  };

  // 👎 DISLIKE
  const handleDislike = async () => {
    setEffect("dislike");
    const res = await api.put(
      `/videos/${id}/dislike`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setVideo(res.data);
    setTimeout(() => setEffect(null), 300);
  };

  // 🔔 SUBSCRIBE / UNSUBSCRIBE
  const toggleSubscribe = async () => {
    setEffect("subscribe");

    const channelId =
      typeof video.channel === "object"
        ? video.channel._id
        : video.channel;

    const res = await api.put(
      `/channels/${channelId}/subscribe`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSubscribed(res.data.subscribers.includes(user.id));
    setVideo({ ...video, channel: res.data });

    setTimeout(() => setEffect(null), 300);
  };

  // 💬 ADD COMMENT
  const addComment = async () => {
    if (!text) return;

    const res = await api.post(
      `/comments/${id}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setComments([res.data.comment, ...comments]);
    setText("");
  };

  if (!video) return <p style={{ padding: 20 }}>Loading video...</p>;

  return (
    <div className="watch-layout">
      {/* LEFT */}
      <div className="watch-main">
        <iframe src={video.videoUrl} title={video.title} allowFullScreen />

        <h1 className="video-title">{video.title}</h1>

        <div className="video-meta-row">
          <span>{video.views || 12034} views</span>
          <span>•</span>
          <span>{new Date(video.createdAt).toDateString()}</span>
        </div>

        {/* CHANNEL ROW */}
        <div className="channel-row">
          <div>
            <strong>{video.channel?.channelName}</strong>
            <p className="subs">
              {video.channel?.subscribers?.length || 0} subscribers
            </p>
          </div>

          <button
            className={`subscribe-btn ${subscribed ? "subscribed" : ""}`}
            onClick={toggleSubscribe}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* ACTIONS */}
        <div className="video-actions">
          <div className="like-group">
            <button onClick={handleLike}>👍 {video.likes}</button>
            <button onClick={handleDislike}>👎 {video.dislikes}</button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="description-box">
          <p className={showMore ? "expanded" : "collapsed"}>
            {video.description}
          </p>

          {video.description?.length > 120 && (
            <button
              className="show-more-btn"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* COMMENTS */}
        <div className="comment-box">
          <img
            className="comment-avatar"
            src="https://i.pravatar.cc/40"
            alt="user"
          />
          <div className="comment-input-area">
            <input
              placeholder="Add a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="comment-actions">
              <button onClick={() => setText("")} className="cancel-btn">
                Cancel
              </button>
              <button onClick={addComment} className="comment-btn">
                Comment
              </button>
            </div>
          </div>
        </div>

        <div className="comments">
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <img
                className="comment-avatar"
                src="https://i.pravatar.cc/40"
                alt="user"
              />
              <div>
                <strong>{c.user.username}</strong>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="watch-right">
        {recommendations.map((v) => (
          <div
            key={v._id}
            className="recommend-card"
            onClick={() => navigate(`/video/${v._id}`)}
          >
            <img src={v.thumbnailUrl} alt={v.title} />
            <div>
              <h4>{v.title}</h4>
              <p>{v.channel?.channelName}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MICRO EFFECTS */}
      {effect === "like" && <div className="effect">👍</div>}
      {effect === "dislike" && <div className="effect">👎</div>}
      {effect === "subscribe" && <div className="effect">🔔</div>}
    </div>
  );
};


export default VideoPlayer;
