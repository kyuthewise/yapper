import Message from "@/app/models/message";
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/app/lib/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"

export async function POST(req: any){
    try{
    const{userid, recieverId, message} = await req.json();
    await connectMongoDB()
    await Message.create({userid, recieverId, message})
    return NextResponse.json({message: "user registered"}, {status: 201})
    }

    
    catch(error){
        console.error('Error during user registration:', error);
        return NextResponse.json({message: 'error ooccur'},{status: 500} )
    }
}







