import User from "@/app/models/user";
import Post from "@/app/models/post";
import { connectMongoDB } from "@/app/lib/server";
import { NextResponse } from "next/server";
import { comment } from "postcss";


export async function POST(req, res){
    const {postid, username, userid, comment} = await req.json()
    try{
        await connectMongoDB()
    const post = await Post.findById(postid)
    const user = await User.findOne({_id: userid})
    const image = user.image
    const sendComment = {
        user: username,
        text: comment,
        image: image
    }
    post.comments.push(sendComment)
    await post.save()

    }
    catch{

    }
    
    return NextResponse.json({message: "Comment posted successfully"}, {status: 201})
}