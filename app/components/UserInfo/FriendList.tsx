import User from "../../models/user";
import { connectMongoDB } from "../../lib/server";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Image from "next/image";
import Chat from "../Chat/chat";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { ChatAltIcon } from '@heroicons/react/outline';
import { Userface, GetPostsProps } from "@/app/types/types";

const FriendList = ({eventTrigger, showFriendList}) => {

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

    const [userList, setUserList] = useState<Userface[]>([])
    const {data:session} = useSession()
    const [selectedUser, setSelectedUser] = useState('')
    const userid = session?.user?.name as string
    const userId = session?.user?.id as string
    const [isListVisible, setIsListVisible] = useState(false);
    const [friendTrigger, setFriendTrigger] = useState(false)



    const toggleFriendList = () => {
      setIsListVisible(!isListVisible);
    };

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
}, [userid, eventTrigger, friendTrigger])

useEffect(() => {
    const socket = io(serverUrl);
    socket.emit('login', userid);
    const audio = new Audio('/audio/bubblepop.wav')
      
    audio.volume = 0.2
  
    socket.on('chat message', (msg) => {

      if(msg.selectedUser === userid){
        audio.play() }
    })
  
    
  }, [userid])
  const handleRemoveFriend = async (friendName) => {
 
      try{
    
        const response = await axios.post('/api/addFriend', {
          adduserid: friendName,
          userid: userId
        }, {
          headers: {
              'Content-Type': 'application/json'
            }
        
        })
        if(response.status === 200 || response.status === 201){
          setFriendTrigger(!friendTrigger)
        }
        }
      catch(error){
        console.log(error)
    
      }
     
     
    setContextMenu({ ...contextMenu, visible: false }); // Hide context menu

  }; 
const imageurl = `/uploads/`
const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, selectedUser: '' });
const handleRightClick = (event, userName) => {
  event.preventDefault();
  setContextMenu({
    visible: true,
    x: event.clientX,
    y: event.clientY,
    selectedUser: userName
  });
};
const closeContextMenu = () => {
  setContextMenu({ ...contextMenu, visible: false });
};
useEffect(() => {
  if (contextMenu.visible) {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the context menu
      if (event.target.closest('.context-menu') === null) {
        closeContextMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }
}, [contextMenu]);



const handleClick = async () =>{

}
return (
  <div className={`xl:w-auto mt-20 lg:mt-0 w-screen h-screen lg:block flex justify-center lg:w-96 lg:inline lg:justify-none  ${showFriendList ? `block` : `hidden`} `}>
    <div className={`h-full w-full p-12 bg-gray-50 xl:w-96 xl:p-2 xl:mt-10 xl:h-5/6 xl:mb-10 xl:inline-flex xl:mr-10 rounded-lg shadow-xl flex flex-col items-center justify-center fixed right-0 dark:bg-gray-900 dark:text-slate-300`}>
      <h2 className="text-xl font-semibold my-4">Friendlist</h2>
      <ul className="h-full w-full flex flex-col inline overflow-y-auto">
        {userList.map((user) => {
          if (user.name !== userid) {
            return (
              <li 
                key={user.name} 
                onClick={() => setSelectedUser(user.name)} 
                onContextMenu={(e) => handleRightClick(e, user.name)}
                className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 object-cover rounded-full mr-4"
                    src={user.image ? user.image : `/uploads/defaultimg.svg`}
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
      {selectedUser && <Chat selectedUser={selectedUser} setSelectedUser={setSelectedUser} />}
    </div>
    {contextMenu.visible && (
  <div 
    style={{ position: 'absolute', top: contextMenu.y, left: contextMenu.x }}
    className="context-menu bg-white shadow-md rounded px-4 py-2"
  >
    <button onClick={() => handleRemoveFriend(contextMenu.selectedUser)}>Remove Friend</button>
  </div>
)}
  </div>
);
}

export default FriendList;