import { connectMongoDB } from "@/app/lib/server";
import NextAuth from "next-auth/next";
import User from "@/app/models/user";


export async function POST(req: any){
    try{
        const {userid, imageid} = await req.json()
        await connectMongoDB()
        await User.findByIdAndUpdate(userid,{ image: imageid}, {new: true})
    }
    catch(error){
   
    }
}