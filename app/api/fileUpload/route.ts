import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import User
 from "@/app/models/user";
import { query } from "firebase/database";
import mongoose from 'mongoose';
import { connectMongoDB } from "@/app/lib/server";
export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("image");
  const userid = formData.get("userid")


  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }



  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);
  console.log(userid)
  try {
    await connectMongoDB()
    const user = await User.findOne({name: userid}).exec()
    if(user){
        user.image = filename;
        await user.save()
        console.log('complete')
    }
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer

    );
     
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};


