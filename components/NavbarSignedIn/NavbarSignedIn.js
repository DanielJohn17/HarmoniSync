import "./NavbarSignedIn.css";
import { HarmoniSyncLogo } from "../../public/index.js";

const NavbarSignedIn = () => {
  return (
    <div>
      <div className="navbar-main">
        <div className="navbar-wrapper">
          <div className="logo-header">
            <a>
              <img
                src={HarmoniSyncLogo}
                alt="HarmoniSync-Logo"
                className="Logo"
              />
            </a>
            <h2 className="header">
              Harmoni<span className="highlight">Sync</span>
            </h2>
          </div>
          <div className="navbar-links">
            <a href="#MyPlaylist">My Playlist</a>
            <a href="#Billboard">
              Billboard
              <br />
              Hot 100
            </a>
            <a href="#Trending">Trending now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSignedIn;
