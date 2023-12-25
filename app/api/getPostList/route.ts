import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import Post from "@/app/models/post";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export const GET = async(req,res) => {
    try {

      await connectMongoDB()
        const posts = await Post.find()
      
        return NextResponse.json({
            items: posts
        })

      } catch (error) {
        return new NextResponse("no post list", { status: 500 });
    
      }
}

