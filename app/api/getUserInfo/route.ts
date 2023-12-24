import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

export async function GET(req, res) {

        try {
            await connectMongoDB();
            const { searchParams} = new URL(req.url);
            const userid = searchParams.get('userid')

            const user = await User.findOne({ name: userid });
            const userInfo = user.info
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return NextResponse.json({userInfo
            })

        } catch (error) {
            return NextResponse.json({message: "Error updating user"}, {status: 500})
        }
}
