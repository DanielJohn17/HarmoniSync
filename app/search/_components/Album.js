import "./styles/album-search.css";
import { useRouter } from "next/navigation";
import { AlbumPlaceholder } from "@public/index";
import { MdOpenInNew } from "react-icons/md";
import { formatText } from "../page";

const Album = ({ album, i }) => {
  const router = useRouter();

  const handleAlbumClick = (id) => {
    router.push(`/album/${id}`);
  };

  return (
    <div className="search-album-container">
      <img
        className="image"
        src={album.images ? album.images : AlbumPlaceholder}
      />
      <h3
        className="hover:text-green-500 hover:underline transition-colors cursor-pointer"
        onClick={() => handleAlbumClick(album.id)}
      >
        {formatText({ text: album.name })}
      </h3>
      <a href={album.spotify_link} target="_blank">
        Spotify &nbsp;
        <MdOpenInNew />
      </a>
    </div>
  );
};

export default Album;
