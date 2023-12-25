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
  const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your service account key file
  });
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET); // Your Google Cloud Storage bucket name

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

    if (user) {
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', err => {
        console.error(err);
        throw new Error('Google Cloud Storage error');
      });

      blobStream.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        user.image = publicUrl; // Save the public URL instead of the filename
        await user.save();
        console.log('Upload complete');
      });

      blobStream.end(buffer);

      return NextResponse.json({ error: "File sces" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "usr not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({ error: "faild to up" }, { status: 500 });
  }
};
