import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import Post from "@/app/models/post";
import { useSearchParams } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export const GET = async(req: Request) => {
    
try {
        const { searchParams} = new URL(req.url);
        const userid = searchParams.get('userid')

        if(userid != null){
        connectMongoDB()

       const user = await User.findOne({name: userid})
       
       const friends = await User.find({ name: {$in: user.friends}});
            console.log('friends: ',friends)
        return NextResponse.json({friends}, {status: 201})
        }


        return NextResponse.json({message: 'no user haha'}, {status: 500})

      } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({message: 'no user haha'}, {status: 500})
      }
}

