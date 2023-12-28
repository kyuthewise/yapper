import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    
    const { searchParams} = new URL(req.url);
    const userid = searchParams.get('userid')

        try {

            await connectMongoDB(); 
          
            const user = await User.findOne({_id:userid})

            if(!user){
                console.log('User not found');
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            const darkMode = user.DarkMode
            return NextResponse.json({darkMode}, {status: 200})
     
        } catch (error) {
            return NextResponse.json({error}, {status: 404})
            }
        }

        export async function POST(req, res) {
    
            const {userid} = await req.json();
        
            console.log('srvdark',)
                try {
        
                    await connectMongoDB(); 
                  
                    const user = await User.findOne({_id: userid})
                    user.DarkMode = !user.DarkMode
                    await user.save();
                    console.log('dark:')

                    return NextResponse.json({message: 'sucess'}, {status: 200})
             
                } catch (error) {
                    return NextResponse.json({message: 'cannot setdarkmode'}, {status: 404})
                    }
                }
        