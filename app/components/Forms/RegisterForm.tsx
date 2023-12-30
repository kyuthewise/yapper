"use client";

import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function RegisterForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

const router = useRouter()
const handleSubmit = async (e) => {
e.preventDefault()
if(!name || !email || !password){
    setError('all fields are necessary')
}
try{ 
    const resUserExists = await fetch('api/userExists', {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name})
    })

    const {user} = await resUserExists.json();

    if(user){
        setError('User already exists')
        return;
    }
    const res = await fetch('/api/register',{
    
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name, email, password
    })
})
if(res.ok){
    const form = e.target;
    form.reset()
    router.push("/")
    console.log('form ok')
}
else{
    console.log('user reg failed')
}
}

catch{
    console.log('error during reg')

}
    }
   
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-zinc-800 to-zinc-900">
            <div className="bg-gradient-to-r from-zinc-300  to-zinc-400 bg-opacity-90 p-6 md:p-12 w-full md:w-2/3 lg:w-/3 xl:w-2/6 scale-75 lg:scale-75 rounded-3xl shadow-2xl border border-gray-100 transform transition duration-500 hover:scale-90">
                <div className="text-center mb-12">
                    <Image
                        src="/icons/logopurplenth.svg"
                        alt="Yapper Logo"
                        className="mx-auto"
                        width={160}
                        height={160}
                    />
                    <h1 className="text-5xl font-extrabold text-indigo-800 mt-6 mb-4">Yapper</h1>
                    <p className="text-xl text-gray-700 font-semibold">Sign Up</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="group relative">
                        <input
                            className="peer h-12 w-full border-b-4 border-gray-300 text-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-700 transition-all"
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="username"
                            required
                        />
                        <label className="absolute left-0 -top-4 pointer-events-none text-gray-600 text-lg ml-3 transition-all group-hover:text-indigo-700 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-8 peer-focus:text-indigo-700">Username</label>
                    </div>
                    <div className="group relative">
                        <input
                            className="peer h-12 mt-4 w-full border-b-4 border-gray-300 text-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-700 transition-all"
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <label className="absolute mt-4 left-0 ml-3 -top-4 pointer-events-none text-gray-600 text-lg transition-all group-hover:text-indigo-700 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-8 peer-focus:text-indigo-700">Email</label>
                    </div>
                    <div className="group relative">
                        <input
                            className="peer h-12 mt-4 w-full border-b-4 border-gray-300 text-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-700 transition-all"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <label className="absolute mt-4 left-0 ml-3 -top-4 pointer-events-none text-gray-600 text-lg transition-all group-hover:text-indigo-700 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-8 peer-focus:text-indigo-700">Password</label>
                    </div>
                    <button className="w-full py-3 text-xl text-white bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-lg">
                        Register
                    </button>
                    <button
    onClick={() => signIn("google")}
    className="mt-4 w-full py-3 text-xl text-white bg-black hover:bg-red-900 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-lg flex items-center justify-center gap-2"
>
    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
    <span>Continue with Google</span>
</button>
                    {error && (
                        <div className="text-center text-red-500 mt-2 animate-pulse">
                            {error}
                        </div>
                    )}
                    <Link href="/">
                        <p className="text-lg mt-6 text-center text-gray-700 hover:text-indigo-800 block transition duration-300 ease-in-out hover:underline">
                            Already have an account? <span className="font-medium">Login</span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
}