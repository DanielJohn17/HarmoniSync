"use client";

import "./styles/artist-search.css";
import { useRouter } from "next/navigation";
import { ArtistPlaceholder } from "@public/index";
import { MdOpenInNew } from "react-icons/md";
import { formatText } from "../page";

const Artist = ({ artist, i }) => {
  const router = useRouter();

  const handleArtistClick = (id) => {
    router.push(`/artist/${id}`);
  };
  return (
    <div className="search-artist-container">
      <div className="flex justify-center items-center w-full h-[120px]">
        <img
          src={artist.images ? artist.images : ArtistPlaceholder}
          alt={`Artist ${artist.name}`}
        />
      </div>
      <h3
        className="hover:text-green-500 hover:underline transition-colors cursor-pointer"
        onClick={() => handleArtistClick(artist.id)}
      >
        {formatText({ text: artist.name, len: 16 })}
      </h3>
      <small>Followers: {artist.followers.toLocaleString()}</small>
      <a href={artist.spotify_link} target="_blank">
        Spotify &nbsp; <MdOpenInNew />
      </a>
    </div>
  );
};

export default Artist;
