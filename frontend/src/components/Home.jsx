import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="home-container">
            <div className="welcome-section">
                <h1>Welcome to MelodyVerse!</h1>
                <p>
                    Discover new music, create playlists, and connect with your
                    favorite artists.
                </p>
                <div className="user-info">
                    <h2>Glad to have you back!</h2>
                    <p>
                        This is your personalized home page. Start exploring new
                        content or continue where you left off.
                    </p>
                </div>
            </div>

            <div className="explore-section">
                <h3>What would you like to do?</h3>
                <ul>
                    <li>
                        <a href="/explore-music">Explore New Music</a>
                    </li>
                    <li>
                        <a href="/playlists">View Your Playlists</a>
                    </li>
                    <li>
                        <a href="/artists">Follow Your Favorite Artists</a>
                    </li>
                    <li>
                        <a href="/profile">Edit Your Profile</a>
                    </li>
                </ul>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Home;
