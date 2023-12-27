import { NextResponse } from "next/server"
import User from "@/app/models/user"
import { connectMongoDB } from "@/app/lib/server"
import bcrypt from 'bcryptjs'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export async function POST(req: any){
    try{
        const{name, email, password} = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB()
        await User.create({name, email, password: hashedPassword, DarkMode: false})
        return NextResponse.json({message: "user registered"}, {status: 201})
    }
    catch(error){
console.error('Error during user registration:', error);
return NextResponse.json({message: 'error ooccur'},{status: 500} )
    }
}