import User from "../models/user";
import { connectMongoDB } from "../lib/server";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Image from "next/image";
import Chat from "./chat";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
const FriendList = () => {

    const [userList, setUserList] = useState([])
    const {data:session} = useSession()
    const [selectedUser, setSelectedUser] = useState('')
    const userid = session?.user?.name
    console.log(selectedUser)

console.log(userid)
useEffect(() =>{

const fetchData = async () =>{

    try{

 if(userid){
        const response = await axios.get('/api/friendlist', {
            params: {userid}
        })
        setUserList(response.data.friends)
 
console.log('sucess')
}
    }
catch(error){
    console.log('error fetching: ', error)

}

}
fetchData()
}, [userid])

useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.emit('login', userid);
    const audio = new Audio('/audio/bubblepop.wav')
      
    audio.volume = 0.2
  
    socket.on('chat message', (msg) => {
        console.log(msg)
      if(msg.selectedUser === userid){
        audio.play() }
    })
  
    
  }, [userid])
  
const imageurl = `/uploads/`
const handleClick = async () =>{

}
return (
    <div>
      <div className="h-5/6 bg-white w-96 mt-10 mb-10 mr-10 rounded-lg max-h-5/6 shadow-lg flex flex-col items-center justify-center fixed right-0">
        <h2 className="absolute top-2 text-2xl font-semibold mt-10">Friendlist</h2>
        <ul className="h-full w-full flex flex-col overflow-y-auto mt-20">
          {userList.map((user) => {
            if (user.name !== userid) {
              return (
                <li key={user.name} onClick={() => setSelectedUser(user.name)} className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 object-cover rounded-full mr-4"
                      src={imageurl + user.image}
                      alt="Profile"
                      onError={(e) => { e.target.src = '/uploads/defaultimg.svg'; }}
                    />
                    <p className="text-lg font-medium">{user.name}</p>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
      {selectedUser && <Chat selectedUser={selectedUser} setSelectedUser={setSelectedUser} />}
    </div>
  );
};


export default FriendList;