import SignInButton from "@/components/component/SignInButton";
import AlgortrimoLogo from "@/components/icons/algotrimo-logo";
import Image from "next/image";
import Link from "next/link";
import faithLogo from "@/assets/faith-colleges-logo.jpg";

export default function SignInPage() {
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
          <h1 className="text-lg font-bold text-center">
            Welcome to the Home of Bravehearts!
          </h1>
        </div>
        <div className="space-y-4 flex justify-center items-center">
          <SignInButton />
        </div>
        <div className="space-y-2 text-center flex items-center justify-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-xs flex flex-row flex-wrap gap-1">
            By logging in, you accept our
            <Link
              href="#"
              className="text-blue-500 hover:text-blue-700"
              prefetch={false}
            >
              terms
            </Link>
            and
            <Link
              href="#"
              className="text-blue-500 hover:text-blue-700"
              prefetch={false}
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <h1 className="text-4xl font-bold mb-8">Sign in to Bravehearts</h1>
    //
    // </div>
  );
}
