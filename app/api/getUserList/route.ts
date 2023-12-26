import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export const GET = async(req: Request) => {
  console.log('getuserlist: before try')
    try {
      console.log('getuserlist: after try')
      await connectMongoDB()
        const users = await User.find().select('name image')
      
        return NextResponse.json({
            items: users
        }, { status: 201 })
        
      } catch (error) {
        return new NextResponse("User list retrieved", { status: 500 });
    
      }
}

