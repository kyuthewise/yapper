import { NextResponse } from "next/server"
import User from "@/app/models/user"
import { connectMongoDB } from "@/app/lib/server"
import Post from "@/app/models/post";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST (req, res) {

    const formData = await req.formData();
        const file = formData.get("file")
        const user = formData.get("user")
        const message = formData.get("message")



    try{
    
        

        console.log(file)
        await connectMongoDB()
        if(file != null){
        
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");   
        await Post.create({user, message, filename})

        await writeFile(
            path.join(process.cwd(), "public/post/" + filename),
            buffer
      
          );
        }
        else{
            const newPost = await Post.create({user, message})
            console.log(newPost);
        }
        return NextResponse.json({message: "Post published"}, {status: 201})
    }
    catch(error){
        console.log("Error occured ", error)
        return NextResponse.json({message: "Error publishing post"}, {status: 500})
    }
}

export async function DELETE(req, res) {
    const { searchParams} = new URL(req.url);
    const postid = searchParams.get('postid')
    try{
    await connectMongoDB()
    const postDelete = await Post.deleteOne({_id:postid})
    
    return NextResponse.json({message: "Post deleted"}, {status: 201})
    }
    catch{

    }
    return NextResponse.json({message: "sum error"}, {status: 500})
}