import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LeftNav from "./components/LeftNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";

function App() {
  return (
    <>
      <Header />

      <div className="page">
        <LeftNav />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/channel" element={<Channel />} />
          </Routes>
        </div>
      </div>
    </>
  );
}


export default App;
