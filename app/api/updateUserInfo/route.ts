
import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { NextResponse } from "next/server"

export async function POST(req, res) {
try{
    const {userInfo, userid} = await req.json();
    console.log(userInfo, userid)
    await User.updateOne({name: userid}, {info: userInfo})
    return NextResponse.json({message: "User updated"}, {status: 201})
}
catch{
    return NextResponse.json({message: "Error updating user"}, {status: 500})
}

}
