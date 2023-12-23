
import { useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import './post.css';
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { isImageFile, isVideoFile } from "./fileUtils";

const GetPosts = ({ sharedData, selectedUser}) => {

  const router = useRouter();
  const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);
 const {data:session} = useSession()
 const [triggerFetch, setTriggerFetch] = useState(false);
 const [comment, setComment] = useState('')
 const [showAllPosts, setShowAllPosts] = useState(true)
const [commentHidden, setCommentHidden] = useState(true)
 const userid = session?.user?.name
  const handleLike = async (postid) => {


    
    try{
        const response = await axios.post(`/api/like`, {
            postid: postid,
            userid: userid
    
        }, {
            headers: {
                'Content-Type': 'application/json'
              }
        }
        
        )
        console.log(`srv response`, response.data);
        setTriggerFetch(true);
    }
    
    catch(error){
        console.error('error liking post:', error)
    socket
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getPostList');
        setPostList(response.data.items);
        console.log('postlist retrieved');
      } catch (error) {
        console.log('error fetching postlist', error);
      }
    };


  setTriggerFetch(false); 
      
    fetchData();
  }, [triggerFetch]);

  const imageurl = `/uploads/`;
  const posturl = '/post/';

const handleDelete = async (postid) =>{
  try{
const response = await axios.delete(`/api/post`, {
  params: {postid}
})
console.log('Post deleted successfully:', response.data)
setTriggerFetch(true)

}
  catch{

}

  }



  const handleComment = async (postid) =>{


try{
  const response = await axios.post(`/api/comment`, {
      postid: postid,
      userid: userid,
      comment: comment

  }, {
      headers: {
          'Content-Type': 'application/json'
        }
  }
  
  )
  console.log(`srv response`, response.data);
  setTriggerFetch(true)
}

catch(error){
  console.error('error liking post:', error)

}
  }

  const handleAddFriend = async(adduserid) => {
console.log(userid)
try{
const response = await axios.post('/api/addFriend', {
  adduserid: adduserid,
  userid: userid
}, {
  headers: {
      'Content-Type': 'application/json'
    }

})
console.log(`srv response`, response.data);
}
catch{

}
  }
const handlePostClick = async (userid) =>{
console.log(userid)
router.push(`/profile?userid=${userid}`);

}
const defaultimg = 'defaultimg.svg'

useEffect(() =>{
  if(selectedUser){
    setShowAllPosts(false)
  }
}, [])



  return (
    <div className="bg-gray-300 p-4">
      <ul className="space-y-8">
        {postList.slice().reverse().map((post) => {
          if (showAllPosts || (selectedUser && selectedUser === post.user)) {
            return (
              <li key={post._id} className="bg-white shadow rounded-lg overflow-hidden">
                {userList.map((user) => {
                  if (user.name === post.user) {
                    return (
                      <div className="p-5" key={user.id}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              alt="Profile"
                              src={imageurl + (user.image ? user.image : defaultimg)}
                              className="object-cover w-10 h-10 rounded-full mr-3 cursor-pointer"
                              onClick={() => handlePostClick(post.user)}
                            />
                            <span onClick={() => handlePostClick(post.user)} className="text-xl font-semibold cursor-pointer">{post.user}</span>
                          </div>
                          {user.name !== userid && (
                            <button className="text-indigo-500 hover:text-indigo-600" onClick={() => handleAddFriend(user.name)}><img className="h-6 w-6"src="/icons/addfriend.svg"/></button>
                          )}
                          {userid === post.user && (
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(post._id)}><img className="h-6 w-6" src="/icons/delete.svg"/></button>
                          )}
                        </div>
                        <p className="mb-4">{post.message}</p>
                        {post.filename && (
                      <div className="my-4">
                        <img 
                          src={posturl + post.filename}
                          alt="Post"
                          className="w-full h-160 object-cover rounded-lg shadow"
  
                        />
                      </div>
                    )}

                        {/* Likes Section */}
                        <div className="flex items-center mb-3">
                          <button className="mr-2 text-indigo-500 hover:text-indigo-600" onClick={() => handleLike(post._id)}><img className="h-6 w-6"src={post.likedBy.includes(userid) ? `/icons/liked.svg` : `/icons/like.svg`}/></button>
                          <span>{post.likes} {post.likes === 1 ?  `like` : `likes`} </span>
                        </div>

                        {/* Comments Section */}
                        <div>
                          <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="p-2 border border-gray-300 rounded w-full mb-2"
                          />
                          <button className="text-indigo-500 hover:text-indigo-600 mb-2" onClick={() => handleComment(post._id)}>Post Comment</button>
                          <button className="text-sm text-gray-500 hover:text-gray-600 mb-2 ml-2" onClick={() => setCommentHidden(!commentHidden)}>
                            {commentHidden ? 'Show comments' : 'Hide comments'}
                          </button>
                          <ul className={`list-none p-0 ${commentHidden ? 'hidden' : ''}`}>
                            {post.comments.slice().reverse().map((comment) => (
                              <li key={comment._id} className="flex items-center mb-1">
                                <span className="font-bold mr-1">{comment.user}:</span>
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