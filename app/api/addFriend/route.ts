import User from "@/app/models/user";
import { connectMongoDB } from "@/app/lib/server";
import { NextResponse } from "next/server";



export async function POST(req: Request, res: Response){

const {userid, adduserid} = await req.json()

console.log(userid, adduserid)
    try{
    await connectMongoDB()

if(userid != adduserid){
    const user = await User.findOne({_id:userid})
    if(!user.friends.includes(adduserid)){

        user.friends.push(adduserid)

        user.markModified('friends');
        await user.save()

        return NextResponse.json({message: "User added successfuly"}, {status: 201})

    }
    
    user.friends = user.friends.filter((id:string) => id != adduserid)
    await user.save()
    return NextResponse.json({message: "user unadded"}, {status: 201})

}
return NextResponse.json({message: "cannot add urself"}, {status: 500})

    }

    catch(error){
        return NextResponse.json({message: "err"}, {status: 500})
    }

    
}