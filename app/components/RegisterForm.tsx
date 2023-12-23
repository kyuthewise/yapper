"use client";

import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
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
        <div className="grid place-items-center h-screen bg-gradient-to-r from-violet-200 to-slate-300">
        <div className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl border border-gray-100 transform transition duration-500 hover:scale-105">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 animate-pulse">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-6 h-96 w-96">
                <div className="group relative">
                    <input
                        className="peer h-12 w-full border-b-4 border-gray-300 text-lg text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-700 transition-all"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="username"
                        required
                    />
                    <label className="absolute left-0 -top-4 pointer-events-none text-gray-600 text-lg ml-3 transition-all group-hover:text-indigo-700 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-8 peer-focus:text-indigo-700">username</label>
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
                <button className="w-full py-3 text-xl text-white bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-lg">
                    Register
                </button>
                {error && (
                    <div className="text-center text-red-500 mt-2 animate-pulse">
                        {error}
                    </div>
                )}
                <Link href="/">
                    <p className="text-lg mt-6 text-center text-gray-700 hover:text-gray-900 block transition duration-300 ease-in-out hover:underline">
                        Already have an account? <span className="font-medium">Login</span>
                    </p>
                </Link>
            </form>
        </div>
    </div>
    
      );
    }