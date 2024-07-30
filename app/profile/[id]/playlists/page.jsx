"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { PlaylistIcon } from "@public";

const PlayListsCard = ({ data, handleTagClick, removePlaylist }) => {
  return (
    <section className="min-h-screen flex flex-wrap gap-4 px-16">
      {data.length > 0 ? (
        data.map((playlist) => (
          <div
            key={playlist.id}
            className="playlist_card"
            onClick={() => handleTagClick(playlist.id)}
          >
            <Image
              src={PlaylistIcon}
              alt={playlist.name}
              width={150}
              height={150}
            />
            <h3 className="text-left">{playlist.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePlaylist(playlist.id);
              }}
              text="Delete Playlist"
            >
              <MdDelete className="text-2xl hover:text-red-600" />
            </button>
          </div>
        ))
      ) : (
        <div className="w-full h-28 flex justify-center items-center">
          <p className="font-satoshi text-3xl font-semibold white_gradient">
            No Playlist yet....
          </p>
        </div>
      )}
    </section>
  );
};

const PlayList = ({ params }) => {
  const router = useRouter();
  const [playlists, setPlayLists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users/${params.id}/playlists`
        );
        const data = await response.json();

        if (params.id) setPlayLists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [params.id]);

  const removePlaylist = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/v1/users/${params.id}/playlists/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPlayLists(playlists.filter((playlist) => playlist.id !== id));
    } catch (error) {
      console.error("Error removing playlist:", error);
    }
  };

  const handleTagClick = (id) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <section className="flex flex-col">
      <div className="pt-16 pb-6 mb-11 px-24 flex justify-between items-center shadow-[5px_95px_100px_rgba(255,255,255,0.15)]">
        <h1 className="text-3xl sm:text-5xl font-bold">My Playlists</h1>
        <button
          type="button"
          onClick={() => router.push(`/playlist/${params.id}/create`)}
          className="py-2 px-6 bg-green-600/60 hover:bg-green-600  text-white font-semibold rounded-full transition-all duration-300 ease-in-out"
        >
          Create Playlist
        </button>
      </div>
      <PlayListsCard
        data={playlists}
        handleTagClick={handleTagClick}
        removePlaylist={removePlaylist}
      />
    </section>
  );
};

export default PlayList;
