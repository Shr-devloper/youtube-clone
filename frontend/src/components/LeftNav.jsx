import "../styles/leftnav.css";

const LeftNav = () => {
  return (
    <nav className="leftnav">
      <div className="nav-item active">🏠<span>Home</span></div>
      <div className="nav-item">🎬<span>Shorts</span></div>
      <div className="nav-item">📺<span>Subscriptions</span></div>
      <div className="nav-item">👤<span>You</span></div>
    </nav>
  );
};

export default LeftNav;
