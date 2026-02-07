import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/channel.css";

const Channel = () => {
  const { token } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");

  // fetch channel
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await api.get("/channels/my-channel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChannel(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChannel();
  }, [token]);

  // fetch videos
  useEffect(() => {
    if (!channel) return;

    const fetchVideos = async () => {
      const res = await api.get("/videos");
      const myVideos = res.data.filter(
        (v) => v.channel._id === channel._id
      );
      setVideos(myVideos);
    };

    fetchVideos();
  }, [channel]);

  // upload video
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/videos",
        {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          category,
          channelId: channel._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Video uploaded");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  // delete video
  const deleteVideo = async (id) => {
    await api.delete(`/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setVideos(videos.filter((v) => v._id !== id));
  };

  if (!channel) return <p style={{ padding: "20px" }}>Loading channel...</p>;

  return (
    <div className="channel-page">
      <h2>{channel.channelName}</h2>
      <p>{channel.description}</p>

      {/* Upload Form */}
      <form className="upload-form" onSubmit={handleUpload}>
        <h3>Upload Video</h3>

        <input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Video URL (embed)"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <input
          placeholder="Thumbnail URL"
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <input
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Upload</button>
      </form>

      {/* Video List */}
      <h3>Your Videos</h3>
      <div className="channel-videos">
        {videos.map((video) => (
          <div key={video._id} className="channel-video">
            <img src={video.thumbnailUrl} alt={video.title} />
            <div>
              <h4>{video.title}</h4>
              <button onClick={() => deleteVideo(video._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
