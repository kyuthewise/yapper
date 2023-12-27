import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    
    const { searchParams} = new URL(req.url);
    const term = searchParams.get('term')
    const userid = searchParams.get('userid')
        try {

            await connectMongoDB(); 
          

            console.log('termsrv:', term)
            const users = await User.find({ 
                name: { $regex: term, $options: 'i' } // This is a simple regex search
            }).select('name image'); // Adjust the fields you want to return
            console.log('serchuser: ', users)
                
            if (users.length === 0) {
                return NextResponse.json({users}, {status: 404})
            }

            return NextResponse.json({users}, {status: 201})
     
        } catch (error) {
            return NextResponse.json({message: 'user not found'}, {status: 404})
            }
        }

