"use client";
import React, { useState, useEffect } from 'react';
import "./track.css";

const Page = () => {
    const dummyTrackID = "2D3Ydu0gb8BRu8fXFt3F5n";
    const [track, setTrack] = useState(null);
    const [lyrics, setLyrics] = useState(null);

    const getTrack = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/tracks/${dummyTrackID}`);
            const data = await response.json();
            if (response.status === 200) {
                setTrack(data);
                console.log(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching track data:", error);
        }
    }

    const getTrackLyrics = async () => {
        if (track) {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/v1/lyrics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        artistName: track.artists[0].name,
                        songName: track.name,
                    })
                });
                const data = await response.json();
                if (response.status === 200) {
                    setLyrics(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching track lyrics:", error);
            }
        }
    }

    useEffect(() => {
        getTrack();
    }, []);

    useEffect(() => {
        getTrackLyrics();
    }, [track]);

    if (!track) {
        return <div>Loading track information...</div>;
    }

    return (
        <div className="track-main">
            <div className="track-header">
                <img src={track.album.images} alt={track.name} />
                <h1>{track.name}</h1>
                <h2>{track.artists[0].name}</h2>
            </div>
            {lyrics ? (
                <div className="track-lyrics">
                    <h3>Lyrics</h3>
                    <p>{lyrics.lyrics}</p>
                </div>
            ) : (
                <p>Loading lyrics...</p>
            )}
        </div>
    )
}

export default Page;
