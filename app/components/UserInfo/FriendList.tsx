import User from "../../models/user";
import { connectMongoDB } from "../../lib/server";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Image from "next/image";
import Chat from "../Chat/chat";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { ChatAltIcon } from '@heroicons/react/outline';
const FriendList = () => {

    const [userList, setUserList] = useState([])
    const {data:session} = useSession()
    const [selectedUser, setSelectedUser] = useState('')
    const userid = session?.user?.name



useEffect(() =>{

const fetchData = async () =>{

    try{

 if(userid){
        const response = await axios.get('/api/getFriendlist', {
            params: {userid}
        })
        setUserList(response.data.friends)
 

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

      if(msg.selectedUser === userid){
        audio.play() }
    })
  
    
  }, [userid])
  
const imageurl = `/uploads/`
const handleClick = async () =>{

}
return (
  <div>
    <div className="h-5/6 bg-gray-50 w-80 mt-10 mb-10 mr-10 rounded-lg max-h-5/6 shadow-xl flex flex-col items-center justify-center fixed right-0">
      <h2 className="text-xl font-semibold my-4">Friendlist</h2>
      <ul className="h-full w-full flex flex-col overflow-y-auto">
        {userList.map((user) => {
          if (user.name !== userid) {
            return (
              <li key={user.name} onClick={() => setSelectedUser(user.name)} className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 object-cover rounded-full mr-4"
                    src={user.image && user.image.includes('https://lh3.googleusercontent.com') ? user.image : (user.image ? imageurl + user.image : imageurl + `defaultimg.svg`)}
                    alt="Profile"
                  />
                  <p className="text-lg font-medium">{user.name}</p>
                </div>
                <ChatAltIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
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