"use client";

import Navbar from "../components/Navbar";
import { useRouter } from 'next/navigation';
import UserInfo from "../components/UserInfo";
import { useSearchParams } from "next/navigation";
import Comp from "../components/comp";
import UserList from "../components/userList";
import GetPosts from "../components/getPosts";
import Feed from "../components/Feed";
import { useSession } from "next-auth/react";

export default function Profile(){

    const searchParams = useSearchParams()
    const router = useRouter();
    const { data: session } = useSession();
    const currentUserId = session?.user?.name;
    const userid = searchParams.get('userid')
    console.log(userid, currentUserId)
    return (
       <div>
        <Navbar></Navbar>
       

    <div className="flex flex-row justify-center">

 <div className="mt-10">
     <UserInfo userid={userid} currentUserId={currentUserId}/>
     </div>
     <div className="w-2/6 mt-10">
        <GetPosts selectedUser={userid} />
     </div>


 </div>
 </div>
 )
}