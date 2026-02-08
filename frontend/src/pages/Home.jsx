import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import ChipsRow from "../components/ChipsRow";
import "../styles/home.css";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  
  const [videos, setVideos] = useState([]);
const { searchTerm } = useSearch();

  useEffect(() => {
    api.get("/videos").then(res => setVideos(res.data));
  }, []);
const filteredVideos = videos.filter((video) =>
  video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  video.description.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="home">
      <ChipsRow />
      <div className="video-grid">
      {filteredVideos.map(video => (
  <VideoCard key={video._id} video={video} />
))}

      </div>
    </div>
  );
};

export default Home;
