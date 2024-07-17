import "./styles/album-search.css";
import { AlbumPlaceholder } from "@public/index";

const Album = ({ album, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <img
        className="image"
        src={album.images ? album.images : AlbumPlaceholder}
      />
      <h3>{album.name}</h3>
      <a href={album.spotify_link}>Spotify Link</a>
    </div>
  );
};

export default Album;
