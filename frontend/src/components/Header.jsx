import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const Header = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="yt-header">
            <div className="yt-left">
                <MenuIcon /> <span className="menu" onClick={toggleSidebar}></span>
                <span className="logo">
                    <span style={{ color: "red" }}>▶</span> YouTube
                </span>

            </div>

            <div className="yt-center">
                <input type="text" placeholder="Search" /> <SearchIcon />
            </div>

            <div className="yt-right">
                {user ? (
                    <>
                        <span className="user">{user.username}</span>
                        <button onClick={logout}>Logout</button> <AccountCircleIcon />
                    </>
                ) : (
                    <>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register">Register</Link> <AccountCircleIcon />
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
