"use client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { HarmoniSyncLogo } from "@public/index.js";
import { CgDetailsMore } from "react-icons/cg";
import "./Navbar.css";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMoreOpetion, setIsMoreOpetion] = useState();

  return (
    <div className="navbar-main relative">
      <div className="navbar-wrapper">
        <Link href="/" className="logo-header">
          <Image
            src={HarmoniSyncLogo}
            alt="HarmoniSync-Logo"
            width={30}
            height={30}
            className="object-contain rounded-full"
          />

          <h2>
            Harmoni<span className="highlight">Sync</span>
          </h2>
        </Link>

        {/* Desktop view */}
        <div className="hidden xl:flex gap-16 items-center mx-4 navbarlin">
          {session?.user && (
            <Link
              href={`/profile/${session?.user.id}/playlists`}
              className="navbar_links"
            >
              My Playlists
            </Link>
          )}

          <Link href="/search" className="navbar_links">
            Search
          </Link>
          <Link href="/new-release" className="navbar_links">
            New Releases
          </Link>
          <Link href="/recommendation" className="navbar_links">
            Recommendation
          </Link>
        </div>

        {/* Mobile view */}
        {isMoreOpetion && (
          <div className="drop_down">
            {session?.user && (
              <Link
                href={`/profile/${session?.user.id}/playlists`}
                className="navbar_links"
                onClick={() => setIsMoreOpetion((prev) => !prev)}
              >
                My Playlists
              </Link>
            )}

            <Link
              href="/search"
              className="navbar_links"
              onClick={() => setIsMoreOpetion((prev) => !prev)}
            >
              Search
            </Link>
            <Link
              href="/new-release"
              className="navbar_links"
              onClick={() => setIsMoreOpetion((prev) => !prev)}
            >
              New Releases
            </Link>
            <Link
              href="/recommendation"
              className="navbar_links"
              onClick={() => setIsMoreOpetion((prev) => !prev)}
            >
              Recommendation
            </Link>
          </div>
        )}

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
                className="object-contain rounded-full select-none"
              />
              {/* Mobile view */}
              <div
                onClick={() => setIsMoreOpetion((prev) => !prev)}
                className="xl:hidden flex justify-end items-center cursor-pointer"
              >
                <CgDetailsMore size={25} />
              </div>
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

              {/* Mobile view */}
              <div
                onClick={() => setIsMoreOpetion((prev) => !prev)}
                className="xl:hidden flex justify-end items-center cursor-pointer"
              >
                <CgDetailsMore size={25} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
