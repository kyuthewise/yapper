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
        console.log('items pop')
        return NextResponse.json({
            items: users
        }, { status: 200 })
        
      } catch (error) {
        return new NextResponse("err User list NOT retrieved", { status: 500 });
    
      }
}

