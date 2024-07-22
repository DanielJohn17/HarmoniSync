"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import TrackComponent from "@components/TrackComponent/TrackComponent";
import "./album.css";

const Album = () => {
  const dummyAlbumID = "5SSWz9CYy5oZp20GAWWBio";
  const [album, setAlbum] = useState({});

  const fetchAlbum = async () => {
    try {
      const responose = await fetch(
        "http://127.0.0.1:5000/api/v1/albums/" + dummyAlbumID
      );
      if (responose.ok) {
        const data = await responose.json();
        console.log(data);
        setAlbum(data);
      } else {
        console.log("Error Fetching Album");
      }
    } catch (error) {
      console.log("Error Fetching Album: " + error);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  // if (!album.name) return <div>Loading...</div>;

  return (
    <div className="album-main">
      <div className="album-head">
        <Image
          src={album.images}
          alt="Album Image"
          width={200}
          height={200}
          className="album-image"
        />
        <div className="album-info">
          <div className="album-title">
            <h1>{album.name}</h1>
          </div>
          {album.artists &&
            album.artists.map((artist, index) => (
              <a key={index} href={artist.spotify_link}>
                {artist.name} &nbsp;
              </a>
            ))}
          <p>Released Date: {album.release_date}</p>
        </div>
      </div>
      <h2>Tracks</h2>
      <div className="album-tracks">
        {album.tracks &&
          album.tracks.map((track, index) => (
            <TrackComponent key={index} track={track} i={index + 1} />
          ))}
      </div>
    </div>
  );
};

export default Album;
