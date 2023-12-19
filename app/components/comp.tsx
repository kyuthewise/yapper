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
export default function Comp(){
  {
    
    const fileInputRef = useRef(null);
        const {data:session} = useSession();
        const [image, setImage] = useState('')
        const [profileImage, setProfileImage] = useState('')
        const [imageUrl, setImageUrl] = useState('')
   
     const userid = session?.user?.name
  
     const handleClick = () => {
      // Trigger a click on the file input when the profile picture is clicked
      fileInputRef.current.click();
    };
    
    const handleImageChange = async (e) =>{
        const file = e.target.files[0];
        setImage(file)
    }




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
        return (

        <div className="bg-white rounded border w-6/6 flex flex-col justify-center items-center">
    
        <div><p>{session?.user?.name}</p></div>
    

    {profileImage ?(
        <div className="flex flex-col items-center">
      {/* Label that will be styled as the profile picture */}
      <label
        className="rounded-full h-20 w-20 aspect-w-4 aspect-h-4 cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        {/* Actual profile picture */}
       
        <Image
        priority={true}
         key={imgurl}
          src={imgurl}
          alt="Profile"
          className="object-cover w-full h-full"
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
    ): null}


    {image && (
      <button type="submit" onClick={handleImageUpload}>Save</button>
        )}
      
      </div>
      
    )
    
        }

}

