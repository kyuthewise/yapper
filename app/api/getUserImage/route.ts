import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";



export const GET = async(req, res) => {
    try {
        const { searchParams} = new URL(req.url);
        const userid = searchParams.get('userid')
        // Perform some logic or fetch data here
        connectMongoDB()
        const user = await User.findOne({name: userid}).exec()
        if(user){
            return NextResponse.json({
                items: user.image
            })
        }
        // Send a simple response
        return new NextResponse("NICE", { status: 200 });
      } catch (error) {

        return new NextResponse("image not retrieved", { status: 500 });
    
      }
}

