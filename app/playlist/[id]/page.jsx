"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { PlaylistIcon } from "@public";
import { Placeholder } from "@public";
import Image from "next/image";
import TrackComponent from "@components/TrackComponent/TrackComponent";

import { formatText } from "@app/search/page";
import { MdOpenInNew } from "react-icons/md";

const calcDuration = (duration) => {
  const d_s = duration / 1000;
  const min = Math.floor(d_s / 60);
  const sec = Math.floor(d_s % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
};

const IndividualPlaylist = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [playlist, setPlaylist] = useState({});
  const [songsId, setSongsId] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchPlaylist = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${session?.user.id}/playlists/${params.id}`
      );
      const data = await response.json();
      setPlaylist(data);
    } catch (error) {
      console.error(error);
    }
  }, [session?.user.id, params.id]);

  const fetchPlaylistTracks = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${session?.user.id}/playlists/${params.id}/tracks`
      );
      const data = await response.json();

      if (data.length > 0) {
        const song = await Promise.all(
          data.map(async (track) => {
            const response = await fetch(
              `http://localhost:5000/api/v1/tracks/${track.id}`
            );
            const data = await response.json();
            return data;
          })
        );
        setSongs(song);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session?.user.id, params.id]);

  useEffect(() => {
    if (session?.user.id && params.id) {
      fetchPlaylist();
      fetchPlaylistTracks();
    }
  }, [fetchPlaylist, fetchPlaylistTracks, session?.user.id, params.id]);

  const handleSearchClick = () => {
    router.push(`/search/?user=${session?.user.id}`);
  };

  return (
    <section className="w-full min-h-screen flex flex-col px-16 py-20">
      <div className="w-full flex items-end gap-10">
        <div className="flex justify-center items-center">
          <Image
            src={PlaylistIcon}
            width={300}
            height={300}
            className="border border-gray-200 "
            alt="Playlist Icon"
          />
        </div>

        <div className="flex flex-col gap-10">
          <h1 className="text-3xl sm:text-6xl font-semibold font-satoshi text-left">
            {playlist && playlist.name} Playlist{" "}
          </h1>
          <p className="text-lg sm:text-xl font-satoshi text-left">
            {playlist && playlist.description}
          </p>
        </div>
      </div>

      <div className="w-full mt-16">
        <h1 className="text-3xl sm:text-6xl font-semibold font-satoshi text-left mb-9">
          Songs
        </h1>
        <ul className="w-full">
          {songs.length > 0 ? (
            <div>
              {songs.map((track, index) => (
                <TrackComponent
                  key={index}
                  track={{ ...track, images: track.album.images }}
                  i={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col justify-center items-center gap-7">
              <h1 className="text-3xl py-1 sm:text-6xl font-semibold font-satoshi bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
                No Songs yet...
              </h1>
              <button
                onClick={handleSearchClick}
                className="my-4 py-1.5 px-5 bg-blue-500 rounded-full hover:bg-blue-300 hover:text-gray-100 transition-colors duration-200"
              >
                Search for Musics
              </button>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default IndividualPlaylist;
