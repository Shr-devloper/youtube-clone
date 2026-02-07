import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/comments.css";

const VideoPlayer = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [video, setVideo] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get(`/videos/${id}`).then((res) => setVideo(res.data));
    api.get(`/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

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

  return (
    <div className="watch-page">
      <iframe
        src={video.videoUrl}
        title={video.title}
        allowFullScreen
      ></iframe>

      <h2>{video.title}</h2>
      <p>{video.description}</p>

      <div className="comment-box">
        <input
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addComment}>Comment</button>
      </div>

      <div className="comments">
        {comments.map((c) => (
          <div key={c._id} className="comment">
            <strong>{c.user.username}</strong>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
