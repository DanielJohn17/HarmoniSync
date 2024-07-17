"use client";
import { useState, React } from "react";
import { Placeholder } from "@public/index";
import TrackComponent from "@components/TrackComponent/TrackComponent";
import Album from "./_components/Album.js";
import Artist from "./_components/Artist.js";
import Audiobook from "./_components/Audiobook.js";
import Episode from "./_components/Episode.js";
import Playlist from "./_components/Playlist.js";
import Show from "./_components/Show.js";

import { useSearchParams } from "next/navigation";

import "./search.css";

const Search = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("id");

  const allOptions = [
    "Track",
    "Artist",
    "Album",
    "Playlist",
    "Show",
    "Episode",
    "Audiobook",
  ];
  const allOpt = [
    "track",
    "artist",
    "album",
    "playlist",
    "show",
    "episode",
    "audiobook",
  ];
  const [searchType, setSearchType] = useState(allOpt);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchType: searchType,
        searchQuery: searchTerm,
        limit: 5,
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.log(data.error);
    } else {
      setSearchResults(data);
      console.log(data);
      console.log(user_id);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "All") {
      setSearchType(allOpt);
    } else {
      setSearchType([selectedOption.toLowerCase()]);
    }
  };

  return (
    <div className="search-main">
      <div className="search-wrapper">
        <h1 className="search-header">Search</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <select onChange={handleSelectChange}>
            <option value="All">All</option>
            {allOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="search-result-container">
          <div className="track-search-container">
            {searchResults.tracks && searchResults.tracks.length > 0 && (
              <>
                <h2>Tracks</h2>
                {searchResults.tracks.map((result, index) => (
                  <div key={index}>
                    <TrackComponent track={result} i={index + 1} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="artist-search-container">
            {searchResults.albums && searchResults.artists.length > 0 && (
              <>
                <h2>Artists</h2>
                {searchResults.artists.map((result, index) => (
                  <div key={index}>
                    <Artist artist={result} i={index + 1} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="album-search-container">
            {searchResults.albums && searchResults.albums.length > 0 && (
              <>
                <h2>Albums</h2>
                {searchResults.albums.map((result, index) => (
                  <div key={index}>
                    <Album album={result} i={index + 1} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="playlist-search-container">
            {searchResults.playlists && searchResults.playlists.length > 0 && (
              <>
                <h2>Playlists</h2>
                {searchResults.playlists.map((result, index) => (
                  <div key={index}>
                    <Playlist playlist={result} i={index + 1} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="audiobook-search-container">
            {searchResults.audiobooks &&
              searchResults.audiobooks.length > 0 && (
                <>
                  <h2>Audiobooks</h2>
                  {searchResults.audiobooks.map((result, index) => (
                    <div key={index}>
                      <Audiobook audiobook={result} i={index + 1} />
                    </div>
                  ))}
                </>
              )}
          </div>

          <div className="show-search-container">
            {searchResults.shows && searchResults.shows.length > 0 && (
              <>
                <h2>Shows</h2>
                {searchResults.shows.map((result, index) => (
                  <div key={index}>
                    <Show show={result} i={index + 1} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="episode-search-container">
            {searchResults.episode && searchResults.episode.length > 0 && (
              <>
                <h2>Episodes</h2>
                {searchResults.episode.map((result, index) => (
                  <div key={index}>
                    <Episode episode={result} i={index + 1} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// const Track = ({ track, i }) => {
//   const calcDuration = () => {
//     const d_s = track.duration / 1000;
//     const min = Math.floor(d_s / 60);
//     const sec = Math.floor(d_s % 60).toString().padStart(2, '0');
//     return `${min}:${sec}`;
//   }

//   return (
//     <div className="search-result-container">
//       <p>{i}</p>
//       <a>Like</a>
//       <img className="image" src={Placeholder} alt="Track Image" />
//       <div className="title-artist">
//         <p>{track.name}</p>
//         <a href={track.artist_name_url[1]}>{track.artist_name_url[0]}</a>
//       </div>
//       <p>{calcDuration()}</p>
//       <a href={track.spotify_link}>Open</a>
//       <a>Add to Playlist</a>
//     </div>
//   )
// }

export default Search;
