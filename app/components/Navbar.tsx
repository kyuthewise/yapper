import Link from "next/link"
import { useState } from "react";
import { signOut } from "next-auth/react"

const Navbar = () => {

    return(
    <div className="bg-slate-700 sticky top-0 h-24 z-50"> 
    <div className="h-16 sticky">
    <button className="p-2  rounded border " onClick={() => signOut()}>sign out</button>
    </div>
    </div>)

}


export default Navbar