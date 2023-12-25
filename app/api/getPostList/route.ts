import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import Post from "@/app/models/post";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export const GET = async(req: Request) => {
    try {

      await connectMongoDB()
        const posts = await Post.find()
      
        return NextResponse.json({
            items: posts
        })
        // Send a simple response
        return new NextResponse("Post list retrieved", { status: 200 });
      } catch (error) {
        return new NextResponse("Post list retrieved", { status: 500 });
    
      }
}

