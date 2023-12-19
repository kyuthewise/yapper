import Link from "next/link"
import { useState } from "react";
import { signOut } from "next-auth/react"

const Navbar = () => {

    return(
    <div className="bg-slate-700 fixed top-0 z-20 w-full"> 
    <div className="h-16">
    <button className="p-2  rounded border" onClick={() => signOut()}>sign out</button>
    </div>
    </div>)

}


export default Navbar