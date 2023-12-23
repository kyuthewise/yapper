import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {

            },
            async authorize(credentials){
                const {name, password} = credentials;
                
                try{
                    await connectMongoDB();
                    const user = await User.findOne({ name })

                    if(!user){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if(!passwordMatch){
                        return null
                    }
                    return user;
                }
               
                catch(error){
console.log("error: ", error)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};