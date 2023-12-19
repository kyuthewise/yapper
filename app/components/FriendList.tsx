import User from "../models/user";
import { connectMongoDB } from "../lib/server";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Image from "next/image";
import { useSession } from "next-auth/react";
const FriendList = () => {

    const [userList, setUserList] = useState([])
    const {data:session} = useSession()
    const userid = session?.user?.name
useEffect(() =>{

const fetchData = async () => {
try{
    const response = await axios.get('/api/getUserList')
    setUserList(response.data.items)
}
catch(error){
    console.log('error fetching userlist', error)
}
}
fetchData()
}, [])


const imageurl = `/uploads/`


    return(

        <div className="h-5/6 bg-white w-96 mt-10 mb-10 mr-10 rounded-lg max-h-5/6 flex items-center justify-center fixed right-0 ">
    
            <ul className="h-full w-full flex flex-col overflow-y-auto">
                {userList.map((user) => {
                    if(user.name != userid){
                    return( 
                        
                        <li key={user.name} className="flex items-center justify">
                            <div className="flex items-center p-3">
                            <img className="h-20 w-20 rounded-full"
                          src={imageurl + user.image} alt="Profile"
                          onError={(e) => {
                            e.target.src = '/uploads/defaultimg.png'; // Set the default image path
                          }}
                          ></img>
                          <p className="ml-3">{user.name}</p>
                          </div>
                          </li>)

                          
                        
                }})}
            </ul>
   
        </div>
    
    )
}

export default FriendList;