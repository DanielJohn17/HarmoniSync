import { PlaylistPlaceholder } from "@public/index";
import { MdOpenInNew } from "react-icons/md";
import "./styles/playlist-search.css";

const Playlist = ({ playlist, i }) => {
  return (
    <div className="search-playlist-container">
      <img
        src={playlist.images ? playlist.images : PlaylistPlaceholder}
        alt={playlist.name}
      />
      <h3>{playlist.name}</h3>
      <a href={playlist.spotify_link}>
        Spotify &nbsp; <MdOpenInNew />
      </a>
    </div>
  );
};

export default Playlist;
