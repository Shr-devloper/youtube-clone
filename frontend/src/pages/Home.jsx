import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import "../styles/video.css";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Education",
  "News",
  "Technology",
];

const Home = () => {
  const [videos, setVideos] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");

const filteredVideos =
  activeCategory === "All"
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  <div className="filters">
  {categories.map((cat) => (
    <button
      key={cat}
      className={cat === activeCategory ? "active" : ""}
      onClick={() => setActiveCategory(cat)}
    >
      {cat}
    </button>
  ))}
</div>

  return (
    <>
    <div className="filters">
  {categories.map((cat) => (
    <button
      key={cat}
      className={cat === activeCategory ? "active" : ""}
      onClick={() => setActiveCategory(cat)}
    >
      {cat}
    </button>
  ))}
</div>

    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
    </>
  );
};

export default Home;
