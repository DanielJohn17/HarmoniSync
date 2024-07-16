"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import "./Navbar.css";
import { HarmoniSyncLogo } from '../../../../public/index.js';

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="navbar-main">
        <div className="navbar-wrapper">
          <div className="logo-header">
            <a><img src={HarmoniSyncLogo} alt="HarmoniSync-Logo" className="Logo"/></a>
            <h2 className="header">Harmoni<span className="highlight">Sync</span></h2>
          </div>
          <div className="navbar-links">
            <a href="#MyPlaylist">My Playlist</a>
            <a href="#Billboard">Billboard<br/>Hot 100</a>
            <a href="#Trending">Trending now</a>
          </div>
          <div className="login-register">
            <button className="landing-login" onClick={()=>{router.push("/login");}}>Login</button>
            <button className="landing-register" onClick={()=>{router.push('/register')}}>Register</button>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
