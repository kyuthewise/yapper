import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";

const UserList = () =>{
const {data:session} = useSession()
const [userId, setUserId] = useState('')
const [socketgr, setSocketgr] = useState([])




  useEffect(() => {

    setUserId(session?.user?.name)
    
    if (userId) {
    const socket = io('http://localhost:3001');
    socket.on("connect", () =>{
    
      socket.emit('clientMessage', {userId});
      socket.on("updateUserList", (data) =>{
        setSocketgr(data)
      })

    } 
    
    )}
  
  }, [session])

  return(
    <div>
    <ul>
      {socketgr.map((user) =>{
        if(user.username != userId){
    
          return(
            <li key={user.username}>{user.username}</li>
          )
        }
    
      })}
    </ul>
    </div>
        
      )
  
}
export default UserList;