import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import { useSearch } from "../context/SearchContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm } = useSearch();

    return (
        <header className="yt-header">
            {/* LEFT */}
            <div className="yt-left">
               <MenuIcon className="icon" data-tip="Menu" />

                <div className="logo" onClick={() => navigate("/")}>
                    <span className="logo-play">▶</span>
                    <span className="logo-text">YouTube</span>
                    <span className="logo-in">IN</span>
                </div>
            </div>

            {/* CENTER (SEARCH) */}

            <div className="yt-center">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button className="search-btn">
                        <SearchIcon />
                    </button>
                </div>
                <div className="mic">
                    <MicIcon />
                </div>
            </div>

            {/* RIGHT */}
            <div className="yt-right">
                <VideoCallOutlinedIcon className="icon" />
                <NotificationsNoneOutlinedIcon className="icon" />

                {user ? (
                    <>
                        <span className="username">{user.username}</span>
                        <AccountCircleIcon className="avatar" onClick={logout} />
                    </>
                ) : (
                    <Link to="/login" className="signin-btn">
                        <AccountCircleIcon />
                        <span>Sign in</span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
