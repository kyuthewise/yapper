import { NextResponse } from "next/server"
import User from "@/app/models/user"
import { connectMongoDB } from "@/app/lib/server"
import Post from "@/app/models/post";
import { ObjectId } from 'mongodb';

export async function POST (req, res) {
   
    

    
    try{
        const { postid, userid } = await req.json();
        const post = await Post.findById(postid);
        await connectMongoDB()

        if (!post.likedBy.includes(userid)) {
            // User hasn't liked the post, proceed with liking
            post.likes += 1;
            post.likedBy.push(userid);
    
            console.log(`Post ${postid} liked by user ${userid}! New likes count: ${post.likes}`);
        }
        else{
            post.likes -= 1;
            post.likedBy = post.likedBy.filter(id => id !== userid)
            console.log(`Post ${postid} disliked by user ${userid}! New likes count: ${post.likes}`);
        }


        await post.save()
        return NextResponse.json({message: "Post liked successfully"}, {status: 201})
    }
    catch(error){
        console.error('Error handling like:', error);
        return NextResponse.json({message: "Error publishing post"}, {status: 500})
    }

}