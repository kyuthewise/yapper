import CreatePost from "./CreatePost";
import GetPosts from "./FeedPosts";
import { useState } from "react";
const Feed = ({setEventTrigger, eventTrigger, showFriendList, showCreatePost, setShowCreatePost}) => {

    const [sharedData, setSharedData] = useState('');

    const handleDataChange = (newData) => {
      setSharedData(newData);
      };

    return(
        <div className={`mx-2 md:mx-4 lg:mx-6 xl:mx-auto my-10 max-w-4xl w-full rounded-lg h-screen lg:block ${showFriendList ? 'hidden' : 'block'}`}>
            <CreatePost showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} onDataChange={handleDataChange} setEventTrigger={setEventTrigger} />
            <GetPosts showFriendList={showFriendList} sharedData={sharedData} setEventTrigger={setEventTrigger} eventTrigger={eventTrigger} selectedUser={""}/>
        </div>
        
    )
}

export default Feed;