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
import { PencilIcon, CameraIcon } from '@heroicons/react/outline'; // Importing icons
import { render } from "react-dom";
export default function Comp({userid, currentUserId}){
  {
    
    const fileInputRef = useRef(null);
        const {data:session} = useSession();

        const [image, setImage] = useState('')
        const [profileImage, setProfileImage] = useState('')
        const [imageUrl, setImageUrl] = useState('')
        const [renderTrigger, setRenderTrigger] = useState(false)
        const [darkMode, setDarkMode] = useState(Boolean)
        const [userInfo, setUserInfo] = useState({
          Hobbies: '',
          Education: '',
          Location: '',
          Aboutme: ''
        });
        const [isEditMode, setIsEditMode] = useState(false);
     const handleClick = () => {
      // Trigger a click on the file input when the profile picture is clicked
      fileInputRef.current.click();
    };
    
    const handleImageChange = async (e) =>{
        const file = e.target.files[0];
        setImage(file)
    }

    useEffect(() => {
      if (!userid) return;
  
      const fetchUserData = async () => {
        try {
          const userInfoResponse = await axios.get('/api/getUserInfo', { params: { userid } });
          const userImageResponse = await axios.get('/api/getUserImage', { params: { userid } });

          setUserInfo(userInfoResponse.data.userInfo || {
            Hobbies: '',
            Education: '',
            Location: '',
            Aboutme: ''
          });
          setDarkMode(userInfoResponse.data.darkmode)
          setProfileImage(userImageResponse.data.items);
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchUserData();
    }, [userid, renderTrigger]);

console.log(renderTrigger)
  const imgurl = `/uploads/${profileImage}`



  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
const response = await axios.post('/api/updateUserInfo', {
  userInfo: userInfo,
  userid: userid

}, {
  headers: {
      'Content-Type': 'application/json'
    }
})

setIsEditMode(false)

    } 
    catch{
    }
  };
console.log('dm details', darkMode)
    const handleImageUpload = async () => {
        try {
          if(!image) return;
          const formData = new FormData();
          formData.append('image', image);
          formData.append('userid', userid);

          // Assume '/api/upload' is your server endpoint for image upload
          const response = await axios.post(`/api/fileUpload`, formData)
        
          if (response.status === 200) {
      
            setRenderTrigger(!renderTrigger);
            setImage('')
          } 

        } 
        
        catch (error) {
          console.error('Error uploading image:', error);
        }
      };
 
        
      return (
        <div className="bg-gray-50 rounded-lg w-full max-w-sm p-5 flex flex-col items-center shadow-lg dark:bg-gray-900 dark:text-slate-300 h-96 mt-10">
          
          <div className="flex flex-col items-center">
            
            <label className="relative rounded-full h-32 w-32 cursor-pointer overflow-hidden mb-4">
              <img
                key={imgurl}
                src={profileImage || (darkMode === true ? '/uploads/defaultimgdark.svg' : '/uploads/defaultimg.svg') }
                alt="Profile"
                className="object-cover w-full h-full "
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <CameraIcon className="h-8 w-8 text-white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
    
            {image && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4" onClick={handleImageUpload}>
                Save Profile Image
              </button>
            )}
          </div>
    
          <div className="text-2xl font-semibold mb-4">{userid}</div>
              
          <div className="h-full w-full ">
            {isEditMode ? (
              <div className="space-y-4">
                  <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="Aboutme"
                  value={userInfo.Aboutme}
                  onChange={handleInputChange}
                  placeholder="Add About Me"
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  type="text"
                  name="Hobbies"
                  value={userInfo.Hobbies}
                  onChange={handleInputChange}
                  placeholder="Add Hobbies"
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="Location"
                  value={userInfo.Location}
                  onChange={handleInputChange}
                  placeholder="Add Location"
                />
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="Education"
                  value={userInfo.Education}
                  onChange={handleInputChange}
                  placeholder="Add Education"
                />
      
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex justify-center items-center" onClick={handleSubmit}>
                  Save Changes
                </button>               
              </div>
            ) : (
              
              <div className="space-y-3 h-full" >
                <div className=""> <p className="text-gray-700 text-center dark:text-slate-300">About Me: <span className="text-gray-900 dark:text-slate-300 font-medium">{userInfo.Aboutme || 'Add About Me'}</span></p></div>
                <div className="mt-10">
                <p className="text-gray-700 dark:text-slate-300">Location: <span className="text-gray-900 dark:text-slate-300 font-medium">{userInfo.Location || 'Add Location'}</span></p>
                <p className="text-gray-700 dark:text-slate-300">Hobbies: <span className=" dark:text-slate-300 text-gray-900 font-medium">{userInfo.Hobbies || 'Add Hobbies'}</span></p>
                <p className="text-gray-700 dark:text-slate-300">Education: <span className="text-gray-900 dark:text-slate-300 font-medium">{userInfo.Education || 'Add Education'}</span></p>
                {(!currentUserId || !userid || userid === currentUserId) && (
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex justify-center items-center" onClick={() => setIsEditMode(true)}>
                    <PencilIcon className="h-5 w-5 mr-2" /> Edit Info
                  </button>
                  
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    
        }

}

