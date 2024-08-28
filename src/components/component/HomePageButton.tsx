"use client";

import { signOut } from "next-auth/react";
import HomeIcon from "../icons/home-icon";

export default function HomePageButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      className="flex items-center bg-white text-gray-700 font-bold py-2 px-4 border border-gray-300 hover:bg-gray-100 transition duration-300 rounded-xl text-sm w-full justify-center"
      onClick={handleSignOut}
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 pointer-events-none mr-2"
      >
        <path
          d="M13.378 3.57l7.077 6.168A1.853 1.853 0 0121 11v8a2 2 0 11-4 0v-3a2 2 0 00-1.85-1.995L15 14H9a2 2 0 00-1.995 1.85L7 16v3a2 2 0 11-4 0v-8a1.853 1.853 0 01.545-1.262l7.077-6.167a1.949 1.949 0 012.756 0z"
          fill="currentcolor"
          fillRule="evenodd"
        ></path>
      </svg>
      Back to Home
    </button>
  );
}
