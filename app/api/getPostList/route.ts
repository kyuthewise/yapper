import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import Post from "@/app/models/post";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export async function GET(req,res){
  console.log('getpostlist: bef try')
    try {
      console.log('getpostlist: af try')
      await connectMongoDB()
        const posts = await Post.find()
        console.log('getpostlist: af c')
        return NextResponse.json({
            items: posts
        })

      } catch (error) {
        return new NextResponse("no post list", { status: 500 });
    
      }
}

