"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/api/auth/signin" });
  };

  return (
    <button
      className="flex items-center bg-white text-gray-700 font-bold py-2 px-4 border border-gray-300 hover:bg-gray-100 transition duration-300 rounded-xl text-sm w-full justify-center"
      onClick={handleSignOut}
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M2.5 13.5H6.75V15H2C1.44772 15 1 14.5523 1 14V2C1 1.44771 1.44772 1 2 1H6.75V2.5L2.5 2.5L2.5 13.5ZM12.4393 7.24999L10.4697 5.28031L9.93934 4.74998L11 3.68932L11.5303 4.21965L14.6036 7.29288C14.9941 7.6834 14.9941 8.31657 14.6036 8.70709L11.5303 11.7803L11 12.3106L9.93934 11.25L10.4697 10.7197L12.4393 8.74999L5.75 8.74999H5V7.24999H5.75L12.4393 7.24999Z"
          fill="#666666"
          fill-rule="evenodd"
        ></path>
      </svg>
      Sign Out
    </button>
  );
}
