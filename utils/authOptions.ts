import { connectMongoDB } from "../app/lib/server";
import User from "../app/models/user"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google";
import { Credentials } from "../app/types/types";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import { Userface, ExtendedUser } from "../app/types/types";
export const authOptions: NextAuthOptions= {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {

            },
            async authorize(credentials: Record<string, string> | undefined){
                const {name, password} = credentials as Credentials;
                
                try{
                    await connectMongoDB();
                    const user = await User.findOne({ name })
                    console.log('usrses: ', user)
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
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
    callbacks: {
        async signIn({ user, account, credentials }) {
            await connectMongoDB(); // Ensure database connection

            if(account && credentials){
            if (account.provider === 'google') {
                // Google Provider logic
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    existingUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image, 
                        // Add other fields as necessary
                    });
                }
                return true; // Successful Google sign-in
            } else {
                // Credentials Provider logic
                const foundUser = await User.findOne({ name: credentials.name });
                if (!foundUser) return false; // User not found

                const passwordMatch = await bcrypt.compare(credentials.password, foundUser.password);
                return passwordMatch; // Return true if password matches, false otherwise
            }
        }
        }, 
        async jwt({ token, user }) {
            // When user signs in, add their MongoDB _id to the JWT token
            if (user) {
                token.userId = (user as any)._id; 
                 // Add the MongoDB _id
            }
            return token;
        },

        async session({ session, token }) {
            if (token.userId) {
                // Extend the session user object
                const extendedUser: ExtendedUser = {
                    ...session.user,
                    id: token.userId as string
                };

                return {
                    ...session,
                    user: extendedUser,
                };
            }
            return session;
        },
    },
};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};