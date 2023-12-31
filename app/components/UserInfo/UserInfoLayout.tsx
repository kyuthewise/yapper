"use client";


import Comp from "./UserDetails";
import { useSession } from "next-auth/react";
import { UserInfoProps } from "@/app/types/types";


const UserInfo:React.FC<UserInfoProps>= ({currentUserId, userid, showUserInfo}) => {
const {data:session} = useSession()
const currentUserid = userid || session?.user?.name;
  



  return(
  <div className={`${showUserInfo ? 'inline-flex flex justify-center  ' : 'hidden'} mt-20 lg:mt-0 bg-white  h-screen w-screen xl:h-5/6 z-10 xl:inline-flex fixed left-0 xl:w-96 xl:mt-10 xl:mb-10 rounded-lg xl:ml-10 dark:bg-gray-900`}>
    <Comp userid={currentUserid} currentUserId={currentUserId}></Comp>
  </div>
    
  )
}
export default UserInfo;