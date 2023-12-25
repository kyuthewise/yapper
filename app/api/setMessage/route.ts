import Message from "@/app/models/message";
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/app/lib/server";
import { getServerSession } from "next-auth";
import User from "@/app/models/user";
import { redirect } from "next/navigation"
import { useSearchParams } from "next/navigation";
export async function POST(req,res){
    try{
    const{userid, recieverId, message} = await req.json();
    await connectMongoDB()

    await Message.create({userid, recieverId, message})
    return NextResponse.json({message: "user registered"}, {status: 201})
    }

    
    catch(error){
        console.error('Error during user registration:', error);
        return NextResponse.json({message: 'error occur'},{status: 500} )
    }
}
export async function GET(req: any){
    const { searchParams} = new URL(req.url);
    const userid = searchParams.get('userid')
    const selectedUser = searchParams.get('selectedUser')

    try{
await connectMongoDB()
const user = await User.findOne({name: selectedUser})
const userpfp = user.image
console.log('userpfp: ', userpfp)
const messages = await Message.find({
    $or: [
      { userid: userid, recieverId: selectedUser },
      { userid: selectedUser, recieverId: userid },
    ],
  });

  return NextResponse.json({messages, userpfp}, {status: 201})

    }
    catch{

    }
    return NextResponse.json({message: "msg gotten"}, {status: 201})
}






