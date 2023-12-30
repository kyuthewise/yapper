
import { useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import './post.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isImageFile, isVideoFile } from "./FileUtils";
import { format, parseISO } from 'date-fns';
import Popup from "./popup";
import DarkModeToggle from "./darkMode";
import { Post,Userface,Comment,GetPostsProps } from "@/app/types/types";
import FriendList from "../UserInfo/FriendList";


const GetPosts:React.FC<GetPostsProps> = ({ sharedData, selectedUser, setEventTrigger, eventTrigger, showFriendList}) => {

  const router = useRouter();
  const [postList, setPostList] = useState<Post[]>([]);
  const [userList, setUserList] = useState<Userface[]>([]);
 const {data:session} = useSession()
 const [showAllPosts, setShowAllPosts] = useState(true)
const [likeTrigger, setLikeTrigger] = useState(false);
const [postStates, setPostStates] = useState({});
const [popup, setPopup] = useState({ show: false, message: '' });
const [showUserComment, setShowUserComment] = useState(false)

 const userid = session?.user?.id as string
 const username = session?.user?.name as string


const handleLike = async (postid:string) => {


try{

        const response = await axios.post(`/api/setLike`, {
            postid: postid,
            userid: userid
    
        }, {
            headers: {
                'Content-Type': 'application/json'
              }
        }
        
        )
        
        setLikeTrigger(!likeTrigger)
    }
    
    catch(error){
        console.error('error liking post:', error)
    }
    }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getUserList');

  

        setUserList(response.data.items);
        
      } catch (error) {
        console.log('error fetching userlist', error);
      }
    };

    fetchData();
  }, [userid, sharedData]);

  useEffect(() =>{
    if(selectedUser){
      setShowAllPosts(false)
    }
  }, [selectedUser])


  useEffect(() => {

    const fetchData = async () => {
      if(userid){
      try {
        const response = await axios.get('/api/getPostList', {
          params: {userid} });
        
  
        setPostList(response.data.items);
    
     
      } catch (error) {
        console.log('error fetching postlist', error);
      }
    }
  else{

  }
    }
      52

    fetchData();
  }, [likeTrigger, sharedData, userid]);

  useEffect(() => {
    const initialStates = {};
    postList.forEach((post) => {
      // Check if any of the comments in the post belong to the current user
      const hasUserComment = post.comments.some(comment => comment.user === username);
      // If the user has commented, initially show the comments
      initialStates[post._id] = { comment: '', commentHidden: !hasUserComment };
    });
    setPostStates(initialStates);
  }, [postList, userid, likeTrigger, eventTrigger]);

  

  const imageurl = `/uploads/`;
  const posturl = '/post/';

const handleDelete = async (postid) =>{
  try{
const response = await axios.delete(`/api/updatePost`, {
  params: {postid}

})
showPopup('Post deleted');



}
  catch{

}
setLikeTrigger(!likeTrigger)
  }




  const handleComment = async (postid) =>{



try{

  const response = await axios.post(`/api/setComment`, {
      postid: postid,
      username: username,
      userid: userid,
      comment: postStates[postid].comment


      

  }, {
      headers: {
          'Content-Type': 'application/json'
        }
  }
  
  )

  setLikeTrigger(!likeTrigger)
  if (response.status === 200 || response.status === 201){
    setShowUserComment(true)
  }

}

catch(error){
  console.error('error liking post:', error)

}
  }

  const handleAddFriend = async(adduserid) => {

try{

const response = await axios.post('/api/addFriend', {
  adduserid: adduserid,
  userid: userid
}, {
  headers: {
      'Content-Type': 'application/json'
    }

})

if(response.status === 200 || response.status === 201){
  showPopup('User followed');
  setEventTrigger(!eventTrigger)
}
}
catch{

}
  }
const handlePostClick = async (userid) =>{

router.push(`/profile?userid=${userid}`);

}

useEffect(() =>{
  if(selectedUser){
    setShowAllPosts(false)
  }
}, [])
const handleCommentChange = (postId:string, value:string) => {
  setPostStates(prev => ({ ...prev, [postId]: { ...prev[postId], comment: value } }));
};
const toggleCommentVisibility = (postId:string) => {
  setPostStates(prev => ({ ...prev, [postId]: { ...prev[postId], commentHidden: !prev[postId].commentHidden } }));
};

const formatDate = (dateString:string) => {
  const date = parseISO(dateString);
  return format(date, 'PPp'); 
};

const showPopup = (message:string) => {
  setPopup({ show: true, message });
};

// Function to hide pop-up
const hidePopup = () => {
  setPopup({ show: false, message: '' });
};
console.log(postStates)
console.log(postList)
  return (
    <div className={`${showFriendList === true ? `hidden` : `mt-20 ${selectedUser ? `lg:mt-12` : 'lg:mt-0'} p-2 md:p-4 lg:p-6 bg-gray-300 dark:bg-gray-800 dark:text-slate-300`} `}>
    <Popup message={popup.message} show={popup.show} onClose={hidePopup} />
    <ul className="space-y-3 md:space-y-4 lg:space-y-6">
        {postList.slice().reverse().map((post) => {
          const postState = postStates[post._id] || { comment: '', commentHidden: true };
          if (showAllPosts || (selectedUser && selectedUser === post.user)) {
            return (
              <li key={post._id} className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-900 dark:text-slate-300">
                {userList.map((user) => {
                  if (user.name === post.user) {
                    return (
                      <div className="p-5 " key={post._id}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              alt="Profile" 
                              src={user.image ? user.image : `/uploads/defaultimg.svg`}
                              className="object-cover w-10 h-10 rounded-full mr-3 cursor-pointer"
                              onClick={() => handlePostClick(post.user)}
                            />
                            <span onClick={() => handlePostClick(post.user)} className="text-xl font-semibold cursor-pointer">{post.user}</span>
                          </div>
                          {user.name !== username && (
                            <button className="text-indigo-500 hover:text-indigo-600" onClick={() => handleAddFriend(user.name)}><img className="h-6 w-6 dark:invert"src="/icons/addfriend.svg"/></button>
                          )}
                          {username === post.user && (
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(post._id)}><img className="h-6 w-6 dark:invert dark:contrast-50" src="/icons/delete.svg"/></button>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                        <p className="mb-4">{post.message}</p>
                        {post.filename && (
                      <div className="my-4">
                        <img 
                          src={post.filename}
                          alt="Post"
                          className="w-full h-96 xl:h-160 object-cover rounded-lg shadow"
  
                        />
                      </div>
                    )}

                        {/* Likes Section */}
                        <div className="flex items-center mb-3">
                          <button className="mr-2 text-indigo-500 hover:text-indigo-600" onClick={() => handleLike(post._id)}><img className="h-6 w-6 dark:brightness-200  
                          dark:contrast-125"src={(post.likedBy.includes(userid) ) ? `/icons/liked.svg` : `/icons/like.svg`}/></button>
                          <span>{post.likes} {post.likes === 1 ?  `like` : `likes`} </span>
                        </div>

                        {/* Comments Section */}
                        <div>
                          <input
                            id={post._id}
                            type="text"
                            value={postState.comment}
                            onChange={(e) => handleCommentChange(post._id, e.target.value)}
                            placeholder="Add a comment..."
                            className="p-2 border border-gray-300 rounded w-full mb-2 dark:border-none dark:bg-gray-700 dark:focus:outline-none"
                          />
                          <button className="text-indigo-500 hover:text-indigo-600 mb-2" onClick={() => handleComment(post._id)}>Post Comment</button>

                       
                          <button className="text-sm text-gray-500 hover:text-gray-600 mb-2 ml-2" onClick={() => toggleCommentVisibility(post._id)}>
{postState.commentHidden ? `Show comments(${post.comments.length})` : 'Hide comments'}
</button>


                          <ul className={`list-none p-0 `}>
                            {post.comments.slice().reverse().map((comment) => (
                              <li key={comment._id} className={`flex items-center mb-1 ${(postState.commentHidden  || !showUserComment) ? 'hidden' : ''}`}>
                                <Link href={`/profile?userid=${comment.user}`}>
                                <div className="flex justify-center items-center">

                                {comment.image &&(
                                <img src={comment.image} className="h-8 w-8 object-cover rounded-full"></img> )}
                                <span className="font-bold mr-1 ml-2">{comment.user}:</span>
                                </div> </Link>
                                <span>{comment.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};


export default GetPosts;