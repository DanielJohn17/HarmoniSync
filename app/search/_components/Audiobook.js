import { AudiobookPlaceholder } from "@public/index";

const Audiobook = ({ audiobook, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <h3>{audiobook.name}</h3>
      <p>{audiobook.images}</p>
      <a href={audiobook.spotify_link}>Spotify Link</a>
    </div>
  );
};

export default Audiobook;
