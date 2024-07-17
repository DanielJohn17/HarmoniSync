"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const PlayListsCard = ({ data, handleTagClick }) => {
  return (
    <div className="">
      {data.length > 0 ? (
        data.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <Image
              src={playlist.image}
              alt={playlist.name}
              width={100}
              height={100}
            />
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <button onClick={() => handleTagClick(playlist.id)}>
              View Playlist
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
    </div>
  );
};

const PlayList = ({ params }) => {
  const router = useRouter();

  const [playlists, setPlayLists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${params.id}/playlists`
      );
      const data = await response.json();

      if (params.id) setPlayLists(data);
    };

    fetchPlaylists();
  }, [params.id]);

  const handleTagClick = (id) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <section className="flex flex-col">
      <div className="pt-16 pb-6 mb-48 px-24 flex justify-between items-center shadow-[5px_95px_100px_rgba(255,255,255,0.15)]">
        <h1 className="text-3xl sm:text-5xl font-bold">My Playlists</h1>
        <button
          type="button"
          onClick={() => router.push(`/playlist/${params.id}/create`)}
          className="py-2 px-6 bg-transparent border hover:bg-green-600 hover:border-green-500 text-white font-semibold rounded-full transition-all duration-300 ease-in-out"
        >
          Create Playlist
        </button>
      </div>
      <PlayListsCard data={playlists} handleTagClick={handleTagClick} />
    </section>
  );
};

export default PlayList;
