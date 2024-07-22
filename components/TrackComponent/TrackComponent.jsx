import { Placeholder } from "@public/index";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CiCircleMore, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { formatText } from "@app/search/page";
import Notify from "@components/NotificationSlider/Notify";
import Image from "next/image";

import "./TrackComp.css";

const TrackComponent = ({ track, i }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const { data: session } = useSession();

  const handleOptionClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const openUserPlaylists = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  const fetchUserPlaylist = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/v1/users/${session.user.id}/playlists`
    );
    const data = await res.json();
    console.log("Playlists: " + data);
    if (data.error) {
      console.log("Error Fetching Playlist.");
    } else {
      setUserPlaylists(data);
    }
  };

  const handlePlaylist = async ({ id }) => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/users/${session.user.id}/playlists/${id}/tracks/add_track`,
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
      alert("Added to Playlist");
      setIsOptionOpen(false);
      showNotification();
    }
  };

  const showNotification = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  useEffect(() => {
    if (session) {
      fetchUserPlaylist();
    }
  }, []);

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
        <Image
          className="track-image"
          src={track.images ? track.images : Placeholder}
          alt="Track Image"
          width={32}
          height={32}
        />
        <div className="track-title-container">
          <p>{formatText({ text: track.name })}</p>

          <div className="track-artist-container">
            {track.artists &&
              track.artists.length > 0 &&
              track.artists.map((artist, index) => (
                <a href={artist.spotify_link} key={index}>
                  {formatText({ text: artist.name })}
                  {index !== track.artists.length - 1 && ",\u00A0"}
                </a>
              ))}
          </div>
        </div>
        <p>{calcDuration()}</p>
        <a href={track.spotify_link}>
          Spotify&nbsp;
          <MdOpenInNew />
        </a>
        <div className="dropdown">
          {session && (
            <button>
              <CiCircleMore onClick={handleOptionClick} />
            </button>
          )}

          {isOptionOpen && (
            <>
              <div className="dropdown-menu">
                <a
                  className="like-track"
                  onClick={() => handlePlaylist({ id: 1 })}
                >
                  <FaHeart />
                  &nbsp;Like
                </a>
                <a onClick={openUserPlaylists}>
                  Add to Playlist &nbsp; <IoIosArrowForward />
                </a>
              </div>

              <div className="playlist-dropdown-menu">
                {isPlaylistOpen &&
                  userPlaylists.map((playlist) => (
                    <a
                      key={playlist.id}
                      onClick={() => handlePlaylist({ id: playlist.id })}
                    >
                      {playlist.name}
                    </a>
                  ))}
              </div>
            </>
          )}
          <Notify
            message="Track added to Playlist"
            isVisible={isNotificationVisible}
          />
        </div>
      </div>
    </>
  );
};

export default TrackComponent;
