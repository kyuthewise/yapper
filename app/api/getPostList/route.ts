import { connectMongoDB } from "@/app/lib/server";
import Post from "@/app/models/post";
import { NextResponse } from "next/server";


export async function GET(req ,res){
  
    try {


      await connectMongoDB()

        const posts = await Post.find()

        return NextResponse.json({
            items: posts
        })

      } catch (error) {
        return NextResponse.json("no post list", { status: 500 });
    
      }
}

