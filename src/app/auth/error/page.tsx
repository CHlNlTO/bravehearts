"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import faithLogo from "@/assets/faith-colleges-logo.jpg";
import SignOutButton from "@/components/component/SignOutButton";
import { signOut } from "next-auth/react";
import HomePageButton from "@/components/component/HomePageButton";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (error === "AccessDenied") {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-sm rounded-xl shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700 w-full mx-5 sm:mx-0">
          <div className="flex justify-center items-center">
            <Image
              alt="Profile"
              className="rounded-full"
              height="48"
              src={faithLogo}
              width="48"
              style={{ aspectRatio: "48/48", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <h1 className="text-lg font-bold">Access Denied</h1>
          </div>
          <div className="space-y-2">
            <div className="space-y-4 flex justify-center items-center">
              <SignOutButton />
            </div>
            {/* <div className="space-y-4 flex justify-center items-center">
              <HomePageButton />
            </div> */}
            <p className="text-zinc-500 dark:text-zinc-400 text-xs pt-4 text-center">
              Use Faith email only. Example: s2**@firstasia.edu.ph
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">An error occurred</h1>
        <p>Please try again later.</p>
      </div>
    </div>
  );
}
