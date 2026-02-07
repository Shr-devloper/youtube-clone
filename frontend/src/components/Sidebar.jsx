import "../styles/sidebar.css";

const Sidebar = ({ open, close }) => {
  return (
    <>
      <div className={`sidebar ${open ? "show" : ""}`}>
        <p>🏠 Home</p>
        <p>🔥 Trending</p>
        <p>📺 Subscriptions</p>
        <p>🎵 Music</p>
        <p>🎮 Gaming</p>
      </div>

      {open && <div className="backdrop" onClick={close}></div>}
    </>
  );
};

export default Sidebar;
