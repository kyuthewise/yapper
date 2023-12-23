import User from "@/app/models/user";
import Post from "@/app/models/post";
import { connectMongoDB } from "@/app/lib/server";
import { NextResponse } from "next/server";
import { comment } from "postcss";


export async function POST(req, res){

const {userid, adduserid} = await req.json()

console.log(userid, adduserid)
    try{
    connectMongoDB()
if(userid != adduserid){
    const user = await User.findOne({name: userid})
    if(!user.friends.includes(adduserid)){

        user.friends.push(adduserid)
        await user.save()
        return NextResponse.json({message: "User added successfuly"}, {status: 201})

    }
    user.friends = user.friends.filter(id => id !== adduserid)
    await user.save()
    return NextResponse.json({message: "user unadded"}, {status: 201})

}
return NextResponse.json({message: "cannot add urself"}, {status: 201})

    }

    catch(error){
        return NextResponse.json({message: "err"}, {status: 500})
    }

    
}