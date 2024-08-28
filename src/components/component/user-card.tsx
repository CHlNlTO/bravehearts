import React from "react";
import Image from "next/image";
import AlgortrimoLogo from "../icons/algotrimo-logo";

interface UserData {
  name: string;
  email: string;
  imageSrc: string;
}

interface UserButtonPopoverProps {
  user: UserData;
  onManageAccount: () => void;
  onSignOut: () => void;
  onAddAccount: () => void;
  onSignOutAll: () => void;
}

export const UserButtonPopover: React.FC<UserButtonPopoverProps> = ({
  user,
  onManageAccount,
  onSignOut,
  onAddAccount,
  onSignOutAll,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg w-[23.5rem] max-w-[calc(100vw-2rem)] z-[10000] outline-none">
      <div className="flex flex-col rounded-lg overflow-hidden">
        <div className="flex items-center p-4 gap-4">
          <div className="relative">
            <div className="rounded-full overflow-hidden w-9 h-9 bg-gray-200">
              <Image
                src={user.imageSrc}
                alt={`${user.name}'s avatar`}
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </span>
            <span className="text-sm text-gray-500 truncate">{user.email}</span>
          </div>
        </div>
        <div className="flex flex-row ml-12 px-5 pb-4 gap-2">
          <button
            onClick={onManageAccount}
            className="flex items-center justify-center gap-2 w-44 px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Manage account
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center justify-center gap-2 w-44 px-2 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                clipRule="evenodd"
              />
            </svg>
            Sign out
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-8 py-4 rounded-b-xl">
        <div className="text-cente flex flex-row justify-center items-center gap-2">
          <p className="text-xs text-gray-500">Secured by</p>
          <a
            href="https://algotrimo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:underline flex flex-row gap-1 justify-center items-center"
          >
            <AlgortrimoLogo /> Algotrimo
          </a>
        </div>
      </div>
    </div>
  );
};
