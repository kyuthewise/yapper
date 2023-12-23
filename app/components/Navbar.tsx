import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="bg-slate-700 fixed top-0 z-20 w-full shadow-md">
      <div className="flex items-center h-16 max-w-6xl mx-auto px-4">
        <Link className="text-white text-2xl font-bold hover:text-gray-300" href="/dashboard">
      Home
        </Link>
        <button 
          onClick={() => signOut()}
          className="ml-auto py-2 px-4 text-white bg-rose-500 hover:bg-rose-600 rounded transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;