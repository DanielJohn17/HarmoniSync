import { Placeholder } from "@public/index";
import { useState } from "react";
import { CiCircleMore, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

import "./TrackComp.css";

const TrackComponent = ({ track, i }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const handleLike = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/users/${dummyUserID}/playlists/${dummyLikedPlaylistID}/tracks/add_track`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: track.id,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("Liked");
    }
  };

  const handlePlaylist = () => {};

  const calcDuration = () => {
    const d_s = track.duration / 1000;
    const min = Math.floor(d_s / 60);
    const sec = Math.floor(d_s % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
      <div className="track-container">
        <p className="track-number">{i}</p>
        <img className="track-image" src={Placeholder} alt="Track Image" />
        <div className="track-title-container">
          <p>{track.name}</p>
          <a href={track.artist_name_url[1]}>{track.artist_name_url[0]}</a>
        </div>
        <p>{calcDuration()}</p>
        <a href={track.spotify_link}>
          Spotify&nbsp;
          <MdOpenInNew />
        </a>
        <div className="dropdown">
          <button>
            <CiCircleMore onClick={handleOptionClick} />
          </button>
          {isOptionOpen && (
            <div className="dropdown-menu">
              <a className="like-track" onClick={handleLike}>
                <FaHeart />
                &nbsp;Like
              </a>
              <a onClick={handlePlaylist}>
                Add to Playlist &nbsp; <IoIosArrowForward />
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackComponent;
