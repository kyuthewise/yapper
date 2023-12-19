"use client";


import Comp from "./comp";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import UserList from "./userList";


const UserInfo = () => {
const {data:session} = useSession()
const [userId, setUserId] = useState('')
  const userid = session?.user?.name
    const sendMessage = async (e) => {
      e.preventDefault()
      socket.emit('chat message', message); 

      try{ 
        const res = await fetch('/api/message',{
          
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userid,message,recieverId
          })
      })
      }
      catch{
        console.log('error during msg')
      };

    }


  return(
  <div className="bg-white h-5/6 fixed left-0 w-96 mt-10 mb-10 rounded-lg ml-10 ">
    <UserList></UserList>
    <Comp></Comp>
  </div>
    
  )
}
export default UserInfo;