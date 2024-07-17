"use client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import { HarmoniSyncLogo } from "@public/index.js";
import "./Navbar.css";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="navbar-main">
      <div className="navbar-wrapper">
        <Link href="/" className="logo-header">
          <Image
            src={HarmoniSyncLogo}
            alt="HarmoniSync-Logo"
            width={30}
            height={30}
            className="logo object-contain"
          />

          <h2>
            Harmoni<span className="highlight">Sync</span>
          </h2>
        </Link>

        <div className="navbar-links">
          {session?.user && (
            <Link href={`/profile/${session?.user.id}/playlists`}>
              My Playlists
            </Link>
          )}

          {session?.user ? (
            <div className="flex gap-3">
              <Link href={`/search?user=${session?.user.id}`}>Search</Link>
              <Link href={`/new-release?user=${session?.user.id}`}>
                New Releases
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/search">Search</Link>
              <Link href="/new-release">New Releases</Link>
            </div>
          )}
        </div>

        <div className="flex">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <button
                type="button"
                onClick={signOut}
                className="py-1.5 px-5 border hover:border-red-600 hover:bg-red-500 transition-all duration-300 ease-in-out rounded-full"
              >
                Sign Out
              </button>
              <Image
                src={session.user.image}
                alt="Profile Image"
                width={40}
                height={40}
                className="object-contain rounded-full"
              />
            </div>
          ) : (
            <div>
              <button
                className="py-1.5 px-5 border hover:border-green-600 hover:bg-green-500 transition-all duration-300 ease-in-out rounded-full"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
