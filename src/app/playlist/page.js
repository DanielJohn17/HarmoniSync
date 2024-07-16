"use client";
import React, { useEffect, useState } from 'react';
import NavbarSignedIn from '../_components/NavbarSignedIn/NavbarSignedIn';
import "./playlist.css";

const Page = () => {
    // const playlist1 = {
    //     name: "Gospel Songs",
    //     description: "I like Gospel Songs",
    //     songs: [
    //         {
    //             title: "Amazing Grace",
    //             artist: "John Newton",
    //             album: "Amazing Grace",
    //             genre: "Gospel",
    //             year: "1779"
    //         },
    //         {
    //             title: "Take My Hand, Precious Lord",
    //             artist: "Mahalia Jackson",
    //             album: "The Essential Mahalia Jackson",
    //             genre: "Gospel",
    //             year: "1956"
    //         },
    //         {
    //             title: "How Great Thou Art",
    //             artist: "Carl Boberg",
    //             album: "How Great Thou Art",
    //             genre: "Gospel",
    //             year: "1885"
    //         },
    //         {
    //             title: "Oh Happy Day",
    //             artist: "Edwin Hawkins Singers",
    //             album: "Let Us Go Into the House of the Lord",
    //             genre: "Gospel",
    //             year: "1968"
    //         },
    //         {
    //             title: "His Eye Is on the Sparrow",
    //             artist: "Ethel Waters",
    //             album: "His Eye Is on the Sparrow",
    //             genre: "Gospel",
    //             year: "1950"
    //         },
    //         {
    //             title: "I Can Only Imagine",
    //             artist: "MercyMe",
    //             album: "Almost There",
    //             genre: "Gospel",
    //             year: "1999"
    //         },
    //         {
    //             title: "Shackles (Praise You)",
    //             artist: "Mary Mary",
    //             album: "Thankful",
    //             genre: "Gospel",
    //             year: "2000"
    //         },
    //         {
    //             title: "Something About the Name Jesus",
    //             artist: "Kirk Franklin",
    //             album: "The Nu Nation Project",
    //             genre: "Gospel",
    //             year: "1998"
    //         },
    //         {
    //             title: "Break Every Chain",
    //             artist: "Tasha Cobbs",
    //             album: "Grace",
    //             genre: "Gospel",
    //             year: "2013"
    //         },
    //         {
    //             title: "Never Would Have Made It",
    //             artist: "Marvin Sapp",
    //             album: "Thirsty",
    //             genre: "Gospel",
    //             year: "2007"
    //         }
    //     ]
    // }

    // const playlist2 = {
    //     name: "Casual Songs",
    //     description: "What is casual songs exactly?",
    //     songs: [
    //         {
    //             title: "Shape of You",
    //             artist: "Ed Sheeran",
    //             album: "÷ (Divide)",
    //             genre: "Pop",
    //             year: "2017"
    //         },
    //         {
    //             title: "Blinding Lights",
    //             artist: "The Weeknd",
    //             album: "After Hours",
    //             genre: "Synthwave",
    //             year: "2019"
    //         },
    //         {
    //             title: "Uptown Funk",
    //             artist: "Mark Ronson ft. Bruno Mars",
    //             album: "Uptown Special",
    //             genre: "Funk",
    //             year: "2014"
    //         },
    //         {
    //             title: "Rolling in the Deep",
    //             artist: "Adele",
    //             album: "21",
    //             genre: "Pop",
    //             year: "2010"
    //         },
    //         {
    //             title: "Can't Stop the Feeling!",
    //             artist: "Justin Timberlake",
    //             album: "Trolls: Original Motion Picture Soundtrack",
    //             genre: "Pop",
    //             year: "2016"
    //         },
    //         {
    //             title: "Havana",
    //             artist: "Camila Cabello ft. Young Thug",
    //             album: "Camila",
    //             genre: "Pop",
    //             year: "2017"
    //         },
    //         {
    //             title: "Happy",
    //             artist: "Pharrell Williams",
    //             album: "G I R L",
    //             genre: "Pop",
    //             year: "2013"
    //         },
    //         {
    //             title: "Old Town Road",
    //             artist: "Lil Nas X ft. Billy Ray Cyrus",
    //             album: "7 EP",
    //             genre: "Country Rap",
    //             year: "2019"
    //         },
    //         {
    //             title: "Roar",
    //             artist: "Katy Perry",
    //             album: "Prism",
    //             genre: "Pop",
    //             year: "2013"
    //         },
    //         {
    //             title: "Counting Stars",
    //             artist: "OneRepublic",
    //             album: "Native",
    //             genre: "Pop Rock",
    //             year: "2013"
    //         }
    //     ]
    // }

    const dummyUserID = "a76f0716-6e49-47f7-98d4-a36c0a139139";
    const [playlist, setPlaylist] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
    const [showAddInput, setShowAddInput] = useState(false);

    const fetchPlaylist = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/v1/users/${dummyUserID}/playlists`);
        const data = await res.json();
        if (data.error) {
            console.log("Error Fetching Playlist.")
        } else {
            console.log("Playlist Fetched Successfully.");
            const playlistsWithSongs = await Promise.all(data.map(async (playlist) => {
                const tracks = await fetchPlaylistSongs(playlist.id);
                return { ...playlist, musics: tracks };
            }));
            setPlaylist(playlistsWithSongs);
            console.log(playlistsWithSongs);
            if (playlistsWithSongs.length > 0) {
                setSelectedPlaylist(playlistsWithSongs[0]);
            }
        }
    }

    const fetchPlaylistSongs = async (playlist_id) => {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${dummyUserID}/playlists/${playlist_id}/tracks`);
        const data = await response.json();
        if (data.error) {
            console.log("Error Fetching Playlist Tracks.")
        } else {
            console.log("Tracks Fetched Successfully.");
        }
        return data;
    }

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const handleAdd = () => {
        setShowAddInput(true);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const newPlaylist = { name: newPlaylistName, description: newPlaylistDescription, musics: [] };
            setPlaylist([...playlist, newPlaylist]);
            setSelectedPlaylist(newPlaylist);
            setNewPlaylistName("");
            setShowAddInput(false);

            postNewPlaylist(newPlaylistName);
        }
    };

    const postNewPlaylist = async (newPlaylistName) => {
        alert("Post Playlist in progress.");
        const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${dummyUserID}/playlists/create_playlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newPlaylistName,
                description: "Manual Description",
            })
        });

        const data = await response.json();
        if (data.error) {
            alert("Playlist couldn't not be created.");
            console.log(data);
        } else {
            alert("Playlist Created");
        }
    };

    return (
        <div className="playlist-main">
            <NavbarSignedIn />
            <div className="playlist-container">
                <div className="playlist-titles">
                    <div className="playlist-header">
                        <h3>Playlists</h3>
                        <button className="playlist-add" onClick={handleAdd}>Add</button>
                    </div>
                    <div className="playlist-list">
                        {playlist.map((playlist, index) => (
                            <div className="playlist-item" key={index}>
                                <button onClick={() => { setSelectedPlaylist(playlist) }}>{playlist.name}</button>
                                {playlist === selectedPlaylist && <p className="playlist-description">{selectedPlaylist.description}</p>}
                            </div>
                        ))}
                        {showAddInput && (
                            <input
                                type="text"
                                value={newPlaylistName}
                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="New playlist Name"
                                autoFocus
                            />
                        )}
                    </div>
                </div>
                {selectedPlaylist && (
                    <div className="playlist-songs">
                        <div className="playlist-header">
                            <h3>Songs</h3>
                            <select>
                                <option value="Sort">Sort</option>
                                <option value="Title">Title</option>
                                <option value="Duration">Artist</option>
                                <option value="Artist">Album</option>
                                <option value="Year">Year</option>
                            </select>
                        </div>
                        <div className="playlist-list">
                            {selectedPlaylist.musics.map((song, index) => (
                                <Song song={song} index={index} key={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const Song = ({ song, index }) => {
    const styles = {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '10px',
    };
    return (
        <div style={styles}>
            <p>{index + 1}</p>
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
            <p>{song.album}</p>
            <p>{song.genre}</p>
            <p>{song.year}</p>
        </div>
    );
}

export default Page;
