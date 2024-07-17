import "./styles/album-search.css";
import { AlbumPlaceholder } from "@public/index";
import { MdOpenInNew } from "react-icons/md";
import { formatText } from "../page";

const Album = ({ album, i }) => {
  return (
    <div className="search-album-container">
      <img
        className="image"
        src={album.images ? album.images : AlbumPlaceholder}
      />
      <h3>{formatText({ text: album.name })}</h3>
      <a href={album.spotify_link} target="_blank">
        Spotify &nbsp;
        <MdOpenInNew />
      </a>
    </div>
  );
};

export default Album;
