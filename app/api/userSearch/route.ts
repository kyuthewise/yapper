import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req, res) {

        try {
            await connectMongoDB(); 
            const { searchParams} = new URL(req.url);
            const term = searchParams.get('term')

            // Search logic - adjust according to needs
            const users = await User.find({ 
                name: { $regex: term, $options: 'i' } // This is a simple regex search
            }).select('name image'); // Adjust the fields you want to return
       
                
         
            return NextResponse.json({users}, {status: 201})
     
        } catch (error) {
            return NextResponse.json({message: 'user not found'}, {status: 404})
            }
        }

