

import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import './post.css'
const GetPosts = ({sharedData}) =>{
const [postList, setPostList] = useState([])
const [userList, setUserList] = useState([])


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

    useEffect(() =>{

        const fetchData = async () => {
        try{
            const response = await axios.get('/api/getPostList')
            setPostList(response.data.items)
            console.log('pstlist retrieved')
        }
        catch(error){
            console.log('error fetching postlist', error)
        }
        }
        fetchData()
        }, [sharedData])
        

const imageurl = `/uploads/`
const posturl = '/post/'

function isVideoFile(filename) {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv']; // Add more video extensions if needed
    const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  
    return videoExtensions.includes(`.${fileExtension.toLowerCase()}`);
  }
  function isImageFile(filename) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']; // Add more image extensions if needed
    const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  
    return imageExtensions.includes(`.${fileExtension.toLowerCase()}`);
  }

console.log(postList)

    return(
<div>
<ul className="mt-20 h-full w-full flex justify-center flex-col">
    
    {postList.slice().reverse().map((post) => {
           return( <li key={post._id}className="mt-10 bg-white">
            {userList.map((user)=> {

                
                if(user.name === post.user){
                
                return(
                    <div className="p-5">
                        <div className="flex flex-row items-center">
                    <img alt="img" src={imageurl + user.image}className="object-cover w-10 h-10 rounded-full"
                ></img>
                <h2 className="text-xl ml-3">{post.user}</h2> 
                </div>
                <p className="mt-5">{post.message}</p>
                </div>
                )
                }
            })}
            
      

            
            {post.filename && isVideoFile(post.filename) ? (
            <video className="img min-w-full " controls src={posturl + post.filename}></video>
    ): null}

     {post.filename && isImageFile(post.filename) ? (
            <img className="img min-w-full " src={posturl + post.filename}></img>
    ): null}

    
      
            </li> )
        })
    }

</ul>
</div>
    )
}

export default GetPosts