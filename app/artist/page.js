"use client";
import React, { useState, useEffect } from "react";
import "./artist.css";
// import Placeholder from "../../../public/placeholder.png";

const Artist = () => {
    const dummyArtistID = "3Vl0nAutuNZ1WwXf1xgLCU";
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState(null);

    const getArtist = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/artists/${dummyArtistID}`);
            const data = await response.json();
            if (response.status === 200) {
                setArtist(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching artist data:", error);
        }
    }

    const getTopTracks = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/artists/${dummyArtistID}/top-tracks`);
            const data = await response.json();
            if (response.status === 200) {
                setTopTracks(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching top tracks:", error);
        }
    }

    const getAlbums = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/artists/${dummyArtistID}/albums`);
            const data = await response.json();
            if (response.status === 200) {
                setAlbums(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    }

    const getRelatedArtists = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/artists/${dummyArtistID}/related-artists`);
            const data = await response.json();
            if (response.status === 200) {
                setRelatedArtists(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching related artists:", error);
        }
    }

    useEffect(() => {
        getArtist();
        getTopTracks();
        getAlbums();
        getRelatedArtists();
    }, []);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div className="artist-main">
            <div className="artist-header">  
                <img src={artist.images ? artist.images : Placeholder} alt="Artist" />
                <h1>{artist.name}</h1>
            </div>
            <hr />
            <div className="top-tracks">
                <h2>Top Tracks</h2>
                {topTracks ? (
                    <ul>
                        {topTracks.map(track => (
                            <li key={track.id}>{track.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading top tracks...</p>
                )}
            </div>
            <div className="albums">
                <h2>Albums</h2>
                {albums ? (
                    <ul>
                        {albums.map(album => (
                            <li key={album.id}>{album.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading albums...</p>
                )}
            </div>
            <div className="related-artists">
                <h2>Related Artists</h2>
                {relatedArtists ? (
                    <ul>
                        {relatedArtists.map(artist => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading related artists...</p>
                )}
            </div>
        </div>
    );
};

export default Artist;
