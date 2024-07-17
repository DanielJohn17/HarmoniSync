import { AudiobookPlaceholder } from "@public/index";
import { formatText } from "../page";
import "./styles/audiobook-search.css";

const Audiobook = ({ audiobook, i }) => {
  return (
    <div className="search-result-container">
      <a href={audiobook.spotify_link} target="_blank">
        <img src={audiobook.images} alt="Audiobook Image" />
      </a>
      <p>{formatText({ text: audiobook.name })}</p>
    </div>
  );
};

export default Audiobook;
