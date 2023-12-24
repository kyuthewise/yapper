import User from "@/app/models/user";
import Post from "@/app/models/post";
import { connectMongoDB } from "@/app/lib/server";
import { NextResponse } from "next/server";
import { comment } from "postcss";


export async function POST(req, res){

const {userid, adduserid} = await req.json()

console.log(userid, adduserid)
    try{
    await connectMongoDB()

if(userid != adduserid){
    const user = await User.findOne({name:userid})
    console.log('nice')
    console.log(user)
    if(!user.friends.includes(adduserid)){
        console.log('nice')
        user.friends.push(adduserid)
        console.log('nice')
        console.log(user)
        user.markModified('friends');
        await user.save()
        console.log('nice')
        console.log('nice')
        return NextResponse.json({message: "User added successfuly"}, {status: 201})

    }
    user.friends = user.friends.filter(id => id != userid)
    return NextResponse.json({message: "user unadded"}, {status: 201})

}
return NextResponse.json({message: "cannot add urself"}, {status: 201})

    }

    catch(error){
        return NextResponse.json({message: "err"}, {status: 500})
    }

    
}