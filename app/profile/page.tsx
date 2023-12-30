"use client";

import Navbar from "../components/Layout/Navbar";
import { useRouter } from 'next/navigation';
import UserInfo from "../components/UserInfo/UserInfoLayout";

import GetPosts from "../components/Feed/FeedPosts";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect} from "react";

export default function Profile(){
    const [userid, setUserId] = useState('')
    const searchParams = useSearchParams()

    useEffect(() => {
        // Only update userid state if searchParams is not null
        if (searchParams) {
          // Use an empty string as a fallback when the parameter is not present
          const userIdParam = searchParams.get('userid') || '';
          setUserId(userIdParam);
        }
      }, [searchParams]);
    
    
    const { data: session } = useSession();
    const currentUserId = session?.user?.name as string;

    
    console.log(userid, currentUserId)
    return (
       <div>
        <Navbar></Navbar>
       

    <div className="flex flex-row justify-center dark:bg-gray-800 mt-20 h-screen ">

 <div className="">
     <UserInfo userid={userid} currentUserId={currentUserId}/>
     </div>
     <div className="lg:w-2/6 w-fullmt-10">
        <GetPosts selectedUser={userid} sharedData={""} setEventTrigger={function (value: boolean): void {
                        throw new Error("Function not implemented.");
                    } } eventTrigger={false} />
     </div>


 </div>
 </div>
 )
}