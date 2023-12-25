import User from "@/app/models/user";
import Post from "@/app/models/post";
import { connectMongoDB } from "@/app/lib/server";
import { NextResponse } from "next/server";
import { comment } from "postcss";


export async function POST(req, res){
    const {postid, userid, comment} = await req.json()
    const comments = []
    try{
        await connectMongoDB()
    const post = await Post.findById(postid)
    const sendComment = {
        user: userid,
        text: comment
    }
    post.comments.push(sendComment)
    await post.save()

    console.log(postid, userid, comment)
    }
    catch{

    }
    
    return NextResponse.json({message: "Comment posted successfully"}, {status: 201})
}