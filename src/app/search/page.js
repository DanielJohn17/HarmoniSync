"use client";
import { useState, React } from 'react';
import { Placeholder } from '../../../public';
import "./search.css";

const Search = () => {
  const allOptions = ['Track', 'Artist', 'Album', 'Playlist', 'Show', 'Episode', 'Audiobook'];
  const allOpt = ['track', 'artist', 'album', 'playlist', 'show', 'episode', 'audiobook'];
  const [searchType, setSearchType] = useState(allOpt);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchType: searchType,
        searchQuery: searchTerm,
        limit: 5
      })
    });
    const data = await response.json();
    if (data.error) {
      console.log(data.error);
    } else {
      setSearchResults(data);
      console.log(data);
    }
  }

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'All') {
      setSearchType(allOpt);
    } else {
      setSearchType([selectedOption.toLowerCase()]);
    }
  }

  return (
    <div className="search-main">
      <div className="search-wrapper">
        <h1 className="search-header">Search</h1>
        <div className="search-filter">
          <input type="text" placeholder="Search" onChange={(e) => { setSearchTerm(e.target.value) }} />
            <select onChange={handleSelectChange}>
              <option value="All">All</option>
              {allOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div className="search-container">
          <div className="search-results">
            {Object.keys(searchResults).length > 0 && searchType.map((type, index) => (
              <div key={index} className="search-res">
                <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Results</h2>
                {searchResults[type + 's'] && searchResults[type + 's'].length > 0 ? (
                  searchResults[type + 's'].map((result, index) => (
                    <div key={index}>
                      {type === 'track' && <Track track={result} i={index + 1} />}
                      {type === 'artist' && <Artist artist={result} i={index + 1} />}
                      {type === 'album' && <Album album={result} i={index + 1} />}
                      {type === 'playlist' && <Playlist playlist={result} i={index + 1} />}
                      {type === 'show' && <Show show={result} i={index + 1} />}
                      {type === 'episode' && <Episode episode={result} i={index + 1} />}
                      {type === 'audiobook' && <Audiobook audiobook={result} i={index + 1} />}
                    </div>
                  ))
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Track = ({ track, i }) => {
  const calcDuration = () => {
    const d_s = track.duration / 1000;
    const min = Math.floor(d_s / 60);
    const sec = Math.floor(d_s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  return (
    <div className="search-result-container">
      <p>{i}</p>
      <a>Like</a>
      <img className="image" src={Placeholder} alt="Track Image" />
      <div className="title-artist">
        <p>{track.name}</p>
        <a href={track.artist_name_url[1]}>{track.artist_name_url[0]}</a>
      </div>
      <p>{calcDuration()}</p>
      <a href={track.spotify_link}>Open</a>
      <a>Add to Playlist</a>
    </div>
  )
}

const Artist = ({ artist, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <img className="image" src={Placeholder} alt="Artist Image" />
      <h3>{artist.name}</h3>
      <p>Followers: {artist.followers}</p>
      <a href={artist.spotify_link}>Spotify Link</a>
    </div>
  )
}

const Album = ({ album, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <img className="image" src={Placeholder} />
      <h3>{album.name}</h3>
      <a href={album.spotify_link}>Spotify Link</a>
    </div>
  )
}

const Playlist = ({ playlist, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <h3>{playlist.name}</h3>
      <p>{playlist.image_url}</p>
      <a href={playlist.spotify_link}>Spotify Link</a>
    </div>
  )
}

const Show = ({ show, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <h3>{show.name}</h3>
      <p>{show.image_url}</p>
      <a href={show.spotify_link}>Spotify Link</a>
    </div>
  )
}

const Episode = ({ episode, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <h3>{episode.name}</h3>
      <p>{episode.image_url}</p>
      <a href={episode.spotify_link}>Spotify Link</a>
    </div>
  )
}

const Audiobook = ({ audiobook, i }) => {
  return (
    <div className="search-result-container">
      <p>{i}</p>
      <h3>{audiobook.name}</h3>
      <p>{audiobook.image_url}</p>
      <a href={audiobook.spotify_link}>Spotify Link</a>
    </div>
  )
}

export default Search;
