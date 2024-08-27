import AddBraveForm from "./add-brave";
import Link from "next/link";
import HomeIcon from "../icons/home-icon";
import MagnifyingGlassIcon from "../icons/magnifying-glass-icon";
import BellIcon from "../icons/bell-icon";
import ProfileIcon from "../icons/profile-icon";

export default function Navbar() {
  return (
    <div className="fixed !bottom-0 sm:!top-0 left-0 h-[75px] sm:h-[61px] w-full bg-transparent backdrop-blur-md px-2 sm:px-0 py-2 sm:py-0">
      <nav className="grid w-full auto-cols-fr grid-flow-col items-center justify-between rounded-2xl sm:rounded-none bg-blur-baseline backdrop-blur-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0.1)] sm:shadow-none border-t sm:border-b border-border-subtlest-tertiary">
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a className="flex flex-col items-center justify-center" href="#">
            <HomeIcon />
            <span className="text-[10px]">Feed</span>
          </a>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a
            className="flex flex-col items-center justify-center text-text-tertiary"
            href="#"
          >
            <MagnifyingGlassIcon />
            <span className="text-[10px]">Explore</span>
          </a>
        </div>
        <AddBraveForm />
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a
            className="flex flex-col items-center justify-center text-text-tertiary"
            href="#"
          >
            <div className="relative">
              <BellIcon />
            </div>
            <span className="text-[10px]">Notifs</span>
          </a>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center py-2">
          <a
            className="flex flex-col items-center justify-center text-text-tertiary"
            href="#"
          >
            <ProfileIcon />
            <span className="text-[10px]">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
