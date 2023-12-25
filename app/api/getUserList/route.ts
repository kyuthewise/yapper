import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export const GET = async(req: Request) => {
    try {

        connectMongoDB()
        const users = await User.find().select('name image')
      
        return NextResponse.json({
            items: users
        })
        // Send a simple response
        return new NextResponse("User list retrieved", { status: 200 });
      } catch (error) {
        return new NextResponse("User list retrieved", { status: 500 });
    
      }
}

