"use client";

import { connectMongoDB } from "@/app/lib/server";
import User from "@/app/models/user";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import io from 'socket.io-client';
import { profile } from "console";
export default function Comp({userid, currentUserId}){
  {
    
    const fileInputRef = useRef(null);
        const {data:session} = useSession();
        const [image, setImage] = useState('')
        const [profileImage, setProfileImage] = useState('')
        const [imageUrl, setImageUrl] = useState('')

     const handleClick = () => {
      // Trigger a click on the file input when the profile picture is clicked
      fileInputRef.current.click();
    };
    
    const handleImageChange = async (e) =>{
        const file = e.target.files[0];
        setImage(file)
    }


console.log(currentUserId, userid)

    useEffect(() => {


    const fetchData = async () => {
      
      try{
      if(!userid) {
        return;
      }
      const response = await axios.get('/api/getUserImage',{
        params: {userid}
      })
      setProfileImage(response.data.items)

      }

      catch(error){
        console.error('Error uploading image:', error);
      }

    }
    fetchData()
    }, [userid, image])


  const imgurl = `/uploads/${profileImage}`
  const [userInfo, setUserInfo] = useState({
    Hobbies: '',
    Education: '',
    Location: '',
    Aboutme: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
setIsEditMode(false)
    } 
    catch{
    }
  };

    const handleImageUpload = async () => {
        try {
          if(!image) return;
          const formData = new FormData();
          formData.append('image', image);
          formData.append('userid', userid);
          // Assume '/api/upload' is your server endpoint for image upload
          const response = await axios.post(`/api/upload`, formData)
          setImage('')
        } 
        
        catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      console.log(profileImage)
        return (

        <div className="bg-white rounded w-6/6 flex flex-col justify-center items-center">
    
      


  
        <div className="flex flex-col items-center mt-10">
      {/* Label that will be styled as the profile picture */}
      <label
        className="rounded-full h-32 w-32 aspect-w-4 aspect-h-4 cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        {/* Actual profile picture */}
       
        <Image
        priority={true}
         key={imgurl}
          src={profileImage ? imgurl : `/uploads/defaultimg.svg`}
          alt="Profile"
          className="object-cover w-full h-full hover:brightness-75"
          width={200}
          height={200}
        />
      </label>

      {/* Invisible file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
    
    </div>
    

  {image && (
    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 mt-4 mb-4 " onClick={handleImageUpload}>Save Profile Image</button>
  )}

  <div className="text-xl font-semibold mb-4 mt-2">{userid}</div>

  <div className="w-full p-5">
    {isEditMode ? (
      <div className="space-y-4">
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          name="Hobbies"
          value={userInfo.Hobbies}
          onChange={handleInputChange}
          placeholder="Add Hobbies"
        />
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          name="Location"
          value={userInfo.Location}
          onChange={handleInputChange}
          placeholder="Add Location"
        />
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          name="Education"
          value={userInfo.Education}
          onChange={handleInputChange}
          placeholder="Add Education"
        />
        <input 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          name="Aboutme"
          value={userInfo.Aboutme}
          onChange={handleInputChange}
          placeholder="Add About Me"
        />
        
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300" onClick={handleSubmit}>Save Changes</button>
      </div>
    ) : (
      <div className="space-y-3">
        <p className="text-gray-700">Hobbies: <span className="text-gray-900 font-medium">{userInfo.Hobbies || 'Add Hobbies'}</span></p>
        <p className="text-gray-700">Location: <span className="text-gray-900 font-medium">{userInfo.Location || 'Add Location'}</span></p>
        <p className="text-gray-700">Education: <span className="text-gray-900 font-medium">{userInfo.Education || 'Add Education'}</span></p>
        <p className="text-gray-700">About Me: <span className="text-gray-900 font-medium">{userInfo.Aboutme || 'Add About Me'}</span></p>
      {(!currentUserId || !userid || userid === currentUserId) && (
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300" onClick={() => setIsEditMode(true)}>Edit Info</button>
    )}
      </div>
    )}
  </div>
</div>
      
    )
    
        }

}

