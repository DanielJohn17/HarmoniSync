import "./TrackComp.css";
import { Placeholder } from '../../../../public';
import { useState, React } from 'react'
import { CiCircleMore, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const TrackComponent = ({ track, i }) => {
  const dummyUserID = "a76f0716-6e49-47f7-98d4-a36c0a139139";
  const dummyLikedPlaylistID = "ee99ae54-50a6-4030-a125-ad2a1ce18b38";

  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOptionOpen(!isOptionOpen);
  }

  const handleLike = async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${dummyUserID}/playlists/${dummyLikedPlaylistID}/tracks/add_track`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            trackId: track.id,
        }),
    });
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        alert("Liked");
    }
  }

  const handlePlaylist = () => {}

  const calcDuration = () => {
    const d_s = track.duration / 1000;
    const min = Math.floor(d_s / 60);
    const sec = Math.floor(d_s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

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
            <a href={track.spotify_link}>Spotify&nbsp;<MdOpenInNew /></a>
            <CiCircleMore className="more-options" onClick={handleOptionClick} />
            {isOptionOpen && 
                <div className="options">
                    <a className="like-track" onClick={handleLike}><FaHeart />&nbsp;Like</a>
                    <a onClick={handlePlaylist}>Add to Playlist &nbsp; <IoIosArrowForward /></a>
                </div>
            }
        </div>
    </>
  )
}



export default TrackComponent;
