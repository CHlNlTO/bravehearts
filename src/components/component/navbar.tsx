"use client";

import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import AddBraveForm from "./add-brave";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "../icons/home-icon";
import MagnifyingGlassIcon from "../icons/magnifying-glass-icon";
import BellIcon from "../icons/bell-icon";
import ProfileIcon from "../icons/profile-icon";
import { UserButtonPopover } from "./user-card";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverTriggerRef = useRef<HTMLDivElement>(null);

  const handleManageAccount = () => {
    // Implement manage account functionality
    console.log("Manage account");
  };

  const handleAddAccount = () => {
    // Implement add account functionality
    console.log("Add account");
  };

  const handleSignOutAll = () => {
    // Implement sign out all functionality
    console.log("Sign out all");
  };

  return (
    <div className="fixed !bottom-0 sm:!top-0 left-0 h-[75px] sm:h-[61px] w-full bg-transparent backdrop-blur-md px-2 sm:px-0 py-2 sm:py-0">
      <nav className="grid w-full auto-cols-fr grid-flow-col items-center justify-between rounded-2xl sm:rounded-none bg-blur-baseline backdrop-blur-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0.1)] sm:shadow-none border-t sm:border-b border-border-subtlest-tertiary">
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <Link href="/" className="flex flex-col items-center justify-center">
            <HomeIcon />
            <span className="text-[10px]">Feed</span>
          </Link>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <Link
            href="/explore"
            className="flex flex-col items-center justify-center text-text-tertiary"
          >
            <MagnifyingGlassIcon />
            <span className="text-[10px]">Explore</span>
          </Link>
        </div>
        {session ? (
          <AddBraveForm />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center py-2">
            <button
              onClick={() => signIn("google")}
              className="flex flex-col items-center justify-center text-text-tertiary"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[10px]">Sign In</span>
            </button>
          </div>
        )}
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <Link
            href="/notifications"
            className="flex flex-col items-center justify-center text-text-tertiary"
          >
            <div className="relative">
              <BellIcon />
            </div>
            <span className="text-[10px]">Notifs</span>
          </Link>
        </div>
        <div
          className="relative flex h-full flex-col items-center justify-center py-2"
          ref={popoverTriggerRef}
        >
          {session ? (
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <ProfileIcon />
              )}
              <span className="text-[10px] mt-1">Profile</span>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="flex flex-col items-center justify-center text-text-tertiary"
            >
              <ProfileIcon />
              <span className="text-[10px]">Profile</span>
            </Link>
          )}

          {isPopoverOpen && session && (
            <div className="absolute bottom-full right-0 mb-2 sm:top-full sm:bottom-auto sm:mt-2">
              <UserButtonPopover
                user={{
                  name: session.user?.name || "",
                  email: session.user?.email || "",
                  imageSrc: session.user?.image || "",
                }}
                onManageAccount={handleManageAccount}
                onSignOut={() => signOut()}
                onAddAccount={handleAddAccount}
                onSignOutAll={handleSignOutAll}
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
