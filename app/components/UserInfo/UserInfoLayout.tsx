"use client";


import Comp from "./UserDetails";
import { useSession } from "next-auth/react";
import { UserInfoProps } from "@/app/types/types";

const UserInfo:React.FC<UserInfoProps>= ({userid, currentUserId}) => {
const {data:session} = useSession()
const currentUserid = userid || session?.user?.name;
  


  return(
  <div className="bg-white h-5/6 fixed left-0 w-96 mt-10 mb-10 rounded-lg ml-10 dark:bg-gray-900">
    <Comp userid={currentUserid} currentUserId={currentUserId}></Comp>
  </div>
    
  )
}
export default UserInfo;