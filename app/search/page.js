"use client";
import { useState, React } from "react";
import { Placeholder } from "@public/index";
import { FaSearch } from "react-icons/fa";
import TrackComponent from "@components/TrackComponent/TrackComponent";
import Album from "./_components/Album.js";
import Artist from "./_components/Artist.js";
import Audiobook from "./_components/Audiobook.js";
import Playlist from "./_components/Playlist.js";

import { useSearchParams } from "next/navigation";

import "./search.css";

export const formatText = ({ text, len = 20 }) => {
  if (text.length > len) {
    return text.substring(0, len) + "...";
  }
  return text;
};

const Search = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get("id");

  const allOptions = ["Track", "Artist", "Album", "Playlist", "Audiobook"];
  const allOpt = ["track", "artist", "album", "playlist", "audiobook"];
  const [searchType, setSearchType] = useState(allOpt);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchType: searchType,
        searchQuery: searchTerm,
        limit: 10,
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

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="search-main min-h-screen">
      <div className="search-wrapper">
        <h1 className="search-header text-5xl font-semibold mb-5">Search</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search"
            onKeyDown={handleEnterKey}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            required
            className="text-black"
          />
          <select
            onChange={handleSelectChange}
            className="search-select text-black"
          >
            <option value="All">All</option>
            {allOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        {Object.keys(searchResults).length === 0 && (
          <>
            <h1 className="font-satoshi my-20 text-4xl sm:text-5xl font-semibold tracking-wider leading-[70px]">
              A Place where <br />{" "}
              <span className="text-blue-500">Everything</span> is Found
            </h1>
            <p className="text-xl">
              Search for your favorite{" "}
              <span className="bg-gradient-to-r from-white to to-blue-500 bg-clip-text text-transparent">
                {" "}
                Tracks, Artists, Albums, Playlists, and Audiobooks.
              </span>{" "}
              <br />
              Which one are you looking for today?
            </p>
          </>
        )}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="search-result-container">
            <div className="track-search-container">
              {searchResults.tracks && searchResults.tracks.length > 0 && (
                <>
                  <h2 className="text-3xl font-semibold">Tracks</h2>
                  {searchResults.tracks.map((result, index) => (
                    <div key={index}>
                      <TrackComponent track={result} i={index + 1} />
                    </div>
                  ))}
                </>
              )}
            </div>

            {searchResults.artists && searchResults.artists.length > 0 && (
              <div className="artist-search-container">
                <h2 className="text-3xl font-semibold my-4">Artists</h2>
                <div className="flex flex-wrap">
                  {searchResults.artists.map((result, index) => (
                    <div key={index}>
                      <Artist artist={result} i={index + 1} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="album-search-container">
              {searchResults.albums && searchResults.albums.length > 0 && (
                <>
                  <h2 className="text-3xl font-semibold my-4">Albums</h2>
                  <div className="flex flex-wrap">
                    {searchResults.albums.map((result, index) => (
                      <div key={index}>
                        <Album album={result} i={index + 1} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="playlist-search-container">
              {searchResults.playlists &&
                searchResults.playlists.length > 0 && (
                  <>
                    <h2 className="text-3xl font-semibold my-4">Playlists</h2>
                    <div className="flex flex-wrap">
                      {searchResults.playlists.map((result, index) => (
                        <div key={index}>
                          <Playlist playlist={result} i={index + 1} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
            </div>

            <div className="audiobook-search-container">
              {searchResults.audiobooks &&
                searchResults.audiobooks.length > 0 && (
                  <>
                    <h2 className="text-3xl font-semibold my-4">Audiobooks</h2>
                    {searchResults.audiobooks.map((result, index) => (
                      <div key={index}>
                        <Audiobook audiobook={result} i={index + 1} />
                      </div>
                    ))}
                  </>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
