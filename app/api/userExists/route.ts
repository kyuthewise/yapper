import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";

import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectMongoDB()
        const {name} = await req.json();
        const user = await User.findOne({name}).select("_id")
        console.log("user:", user)
        return NextResponse.json({user})
    }
    catch(error){
console.log(error)
return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    }
}