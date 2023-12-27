import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import Post from "@/app/models/post";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";



export async function GET(req ,res){
  
const br = process.env.GCLOUD_SERVICE_KEY
  console.log('prcsaewaeweweewe: ',br)
    try {
      const { searchParams} = new URL(req.url);
      const userid = searchParams.get('userid')

      await connectMongoDB()

        const posts = await Post.find()

        return NextResponse.json({
            items: posts
        })

      } catch (error) {
        return NextResponse.json("no post list", { status: 500 });
    
      }
}

