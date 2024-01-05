"use client";


import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PencilIcon, CameraIcon } from '@heroicons/react/outline'; // Importing icons
import DarkModeToggle from "../Feed/darkMode";
import { SearchIcon, UserAddIcon, LogoutIcon } from '@heroicons/react/outline';
import Link from "next/link";
export default function Comp({userid, currentUserId}){
  {
    
        const fileInputRef = useRef<HTMLInputElement>(null);
        const {data:session} = useSession();

        const [image, setImage] = useState<string>('')
        const [profileImage, setProfileImage] = useState<string>('')
        const [renderTrigger, setRenderTrigger] = useState(false)
        const [darkMode, setDarkMode] = useState(Boolean)
        const [userFriendList, setUserFriendList] = useState<string[]>([])
        const [friendTrigger, setFriendTrigger] = useState(false)
        const [userInfo, setUserInfo] = useState({
          Hobbies: '',
          Education: '',
          Location: '',
          Aboutme: ''
        });
        const [isEditMode, setIsEditMode] = useState(false);
      const currentId = session?.user?.id as string
     const handleClick = () => {
      if(fileInputRef.current){
      fileInputRef.current.click();
      }
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
          
               
          if(userid && currentUserId) {
            const responseFriendList = await axios.get('/api/getFriendlist', {
              params: {userid: currentUserId}
          })
          const friendList = responseFriendList.data.friends.map((friend => friend.name))
          setUserFriendList(friendList)
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchUserData();
    }, [renderTrigger, friendTrigger, profileImage, currentId]);





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
 const handleRemoveFriend = async () =>{
  try{

    const response = await axios.post('/api/addFriend', {
      adduserid: userid,
      userid: currentId
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
 }
 

      return (
        <div className=" rounded-lg w-full  h-5/6 max-w-sm p-5 mt-20 lg:mt-10 2xl:block flex flex-col items-center  dark:bg-gray-900 dark:text-slate-300 h-96">
          
          <div className="flex flex-col items-center">
            
            <label className="relative rounded-full h-32 w-32 cursor-pointer overflow-hidden mb-4">
              <img
                src={profileImage || (darkMode === true ? '/uploads/defaultimgdark.svg' : '/uploads/defaultimg.svg') }
                alt="Profile"
                className="object-cover w-full h-full "
              />
              {(!currentUserId) ? (
                <>
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <CameraIcon className="h-8 w-8 text-white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
              </>
              ): null }
            </label>
    
            {image && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4" onClick={handleImageUpload}>
                Save Profile Image
              </button>
            )}
          </div>
    
          <div className="text-2xl font-semibold mb-4 text-center"><Link href={`/profile?userid=${userid}`}>{userid}</Link></div>
              
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
                <div className=""> <p className="text-gray-700 text-center dark:text-slate-300">About Me: <span className="text-gray-900 dark:text-slate-300 font-medium">{userInfo.Aboutme || ((currentUserId && currentUserId === userid) ? 'Add about me' : 'None selected')}</span></p></div>
                {(currentUserId && currentUserId != userid &&
            <div className="flex items-center justify-center"> 
          <button className="bg-gray-400 hover:bg-gray-300 w-48 font-bold hover:dark:bg-indigo-400 dark:bg-indigo-500 p-3 rounded-2xl" onClick={handleRemoveFriend}>{userFriendList.includes(userid) ? `UNFOLLOW` : `FOLLOW`}</button>
          </div>
         
         )}

                <div className="mt-10">
                <p className="mt-12 text-gray-700 font-800 text-xl dark:text-slate-300">Location: <span className="text-gray-900 dark:text-slate-300 font-medium">{userInfo.Location || ((currentUserId && currentUserId === userid) ? 'Add location' : 'None selected')}</span></p>
                <p className="text-gray-700 text-xl dark:text-slate-300">Hobbies: <span className=" dark:text-slate-300 text-gray-900 font-medium">{userInfo.Hobbies || ((currentUserId && currentUserId === userid) ? 'Add hobbies' : 'None selected')}</span></p>
                <p className="text-gray-700 text-xl dark:text-slate-300">Education: <span className="text-gray-900 dark:text-slate-300 font-medium">{userInfo.Education || ((currentUserId && currentUserId === userid) ? 'Add Education' : 'None selected')}</span></p>
                {(!currentUserId || !userid || userid === currentUserId) && (
                  <button className="w-full mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex justify-center items-center" onClick={() => setIsEditMode(true)}>
                    <PencilIcon className="h-5 w-5 mr-2" /> Edit Info
                  </button>
                  
                )}
                </div>
              </div>
            )}
          </div>
        
          <div className="xl:hidden mt-12">
           
          <DarkModeToggle/>
          <button 
          
        onClick={() => signOut()}
        className="mt-10 py-2 px-3 text-gray-800 bg-transparent hover:bg-gray-200 rounded transition-colors duration-300 flex items-center dark:text-slate-300"
      >
        <LogoutIcon className="h-5 w-5 mr-2" />Sign Out
      </button>
      </div>
        </div>
        
      );
    
        }

}

