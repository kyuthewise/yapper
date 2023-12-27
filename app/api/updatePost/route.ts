import { NextResponse } from "next/server"
import User from "@/app/models/user"
import { connectMongoDB } from "@/app/lib/server"
import Post from "@/app/models/post";
import path from "path";
import { writeFile } from "fs/promises";
import { Storage } from '@google-cloud/storage';

export async function POST (req, res) {
    const googleServiceJson = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_JSON, 'base64').toString());

    const storage = new Storage({
        keyFilename: googleServiceJson, // Path to your service account key file
      });
      const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET); 

    const formData = await req.formData();
        const file = formData.get("file")
        const user = formData.get("user")
        const message = formData.get("message")


        

    try{
    
        

        console.log(file)
        await connectMongoDB()

        if(file != null){
            
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
            const blob = bucket.file(filename);
          
            const uploadPromise = new Promise((resolve, reject) => {
              const blobStream = blob.createWriteStream({ resumable: false });
          
              blobStream.on('error', err => {
                console.error(err);
                reject(new Error('Google Cloud Storage error'));
              });
          
              blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                const newPost = await Post.create({ user, message, filename: publicUrl });
                resolve(newPost);
              });
          
              blobStream.end(buffer);
            });
          
            try {
              const post = await uploadPromise;
              return NextResponse.json({ message: "Post published with image", post }, { status: 201 });
            } catch (error) {
              console.log("Error during image upload and post creation: ", error);
              return NextResponse.json({ message: "Error publishing post with image" }, { status: 500 });
            }
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