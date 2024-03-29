import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Link from "next/link";
import { Messageface } from "@/app/types/types";
const Chat = ({selectedUser, setSelectedUser}) => {


const {data:session} = useSession()
const [message, setMessage] = useState('')
const [socket, setSocket] = useState<any>()
const userid = session?.user?.name
const [messages, setMessages] = useState<Messageface[]>([]);
const [loading, setLoading] = useState(true);
const [userPfp, setUserPfp] = useState('')
const [openChat, setOpenChat] = useState(true)
const messagesContainerRef = useRef<HTMLDivElement>(null); 


useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    const audio = new Audio('/audio/bubblepop.wav')
    
    audio.volume = 0.2
      

      socket.on('chat message', (msg) => {
     

        if((msg.selectedUser === userid && msg.userid === selectedUser) || msg.userid === userid){
        setMessages((prevMessages) => [...prevMessages, msg]) 
    }
    setMessage('')

        

      });

      setSocket(socket)
      return () => {
        socket.disconnect();
      };
    }, [userid])


useEffect(() => {
    const fetchData = async () => {


    }

fetchData()

}, [])



const handleCloseChat = () =>{
    setOpenChat(false)
    setSelectedUser('')

}
    const sendMessage = async (e) => {
        e.preventDefault()
       
        if(message != ''){
        socket.emit('chat message', message, userid, selectedUser); 
        }
        else{
          console.log('empy msg')
          return
        }

        try{ 
          const res = await fetch('/api/setMessage',{
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userid,message,recieverId:selectedUser
            })
        })
        setMessage('')
        }
        catch{
          console.log('error during msg')
        };
  
      }

      useEffect(() => {
        setOpenChat(true)
        const fetchMessages = async () => {
            const response = await axios.get('/api/setMessage', {
                params: {userid,selectedUser}
            })


          const{userpfp} = response.data

          const {messages} = response.data;
          setMessages(messages)
          setUserPfp(userpfp)
 
        }
        fetchMessages()
      }, [selectedUser])

      useEffect(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      }, [messages]);


const imgurl = `/uploads/`
const toggleLink = () => {

}
return openChat ? (
  <div className="fixed z-10 bg-white lg:inset dark:bg-slate-700 lg:w-96 lg:bottom-0 lg:mb-4 lg:mr-4 rounded-lg shadow-lg flex flex-col">
    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center">
        <Link href={`/profile?userid=${selectedUser}`}><img className="w-10 h-10 object-cover rounded-full mr-3" src={userPfp ? userPfp : `/uploads/defaultimg.svg`} alt={selectedUser} /></Link>
        <p className="text-lg font-medium dark:text-slate-300"><Link href={`/profile?userid=${selectedUser}`}>{selectedUser}</Link></p>
      </div>
      <button className="text-gray-600 hover:text-gray-800 dark:text-slate-300 dark:hover:text-white" onClick={() => setSelectedUser('')}>&times;</button>
    </div>

    <div className="flex-grow lg:inline overflow-y-auto lg:h-72 p-3 dark:text-slate-300" ref={messagesContainerRef}>
      <ul>
        {messages.map((message) => (
          <li key={message._id ? message._id : 'temp-key'} className={`${message.userid === userid ? 'text-right' : 'text-left'} mb-2`}>
            <div className={`${message.userid === userid ? 'bg-indigo-100 dark:bg-gray-800' : 'bg-gray-100 dark:bg-zinc-800'} inline-block p-2 rounded-lg max-w-xs`}>
              <p className="text-sm">{message.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-t border-gray-200 p-3 dark:border-gray-600">
      <form className="flex" onSubmit={sendMessage}>
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-indigo-500 dark:border-none dark:bg-gray-800 dark:focus:border-indigo-600 dark:text-slate-300"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 rounded-r-lg hover:bg-indigo-600 dark:hover:bg-indigo-700">
          Send
        </button>
      </form>
    </div>
  </div>
) : null;
};

export default Chat;