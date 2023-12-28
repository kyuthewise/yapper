import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import User
 from "@/app/models/user";
import { query } from "firebase/database";
import { Storage } from '@google-cloud/storage';
import mongoose from 'mongoose';
import { connectMongoDB } from "@/app/lib/server";
export const POST = async (req, res) => {

  const googleServiceJson = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_JSON!, 'base64').toString());


  const storage = new Storage({
    credentials: googleServiceJson, // Path to your service account key file
  });
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET!); // Your Google Cloud Storage bucket name

  const formData = await req.formData();

  const file = formData.get("image");
  const userid = formData.get("userid")


  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }



  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  const blob = bucket.file(filename);





  try {
    await connectMongoDB();
    const user = await User.findOne({ name: userid }).exec();
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    await new Promise<void>((resolve, reject) => {
      const blobStream = blob.createWriteStream({ resumable: false });

      blobStream.on('error', err => {
        console.error(err);
        reject(new Error('Google Cloud Storage error'));
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        user.image = publicUrl;
        await user.save();
        console.log('Upload complete');
        resolve();
      });

      blobStream.end(buffer);
    });

    return new NextResponse(JSON.stringify({ message: "File uploaded successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error occurred", error);
    return new NextResponse(JSON.stringify({ error: "Failed to upload" }), { status: 500 });
  }
};