import "./styles/artist-search.css";
import { ArtistPlaceholder } from "@public/index";
import { MdOpenInNew } from "react-icons/md";

const Artist = ({ artist, i }) => {
  return (
    <div className="search-artist-container">
      <img
        src={artist.images ? artist.images : ArtistPlaceholder}
        alt={`Artist ${artist.name}`}
      />
      <h3>{artist.name}</h3>
      <small>Followers: {artist.followers}</small>
      <a href={artist.spotify_link} target="_blank">
        Spotify &nbsp; <MdOpenInNew />
      </a>
    </div>
  );
};

export default Artist;
