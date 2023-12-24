import CreatePost from "./CreatePost";
import GetPosts from "./FeedPosts";
import { useState } from "react";
const Feed = () => {

    const [sharedData, setSharedData] = useState('');

    const handleDataChange = (newData) => {
      setSharedData(newData);
      };

    return(
        <div className="h-full w-5/12 mt-10 absolute rounded-lg ">
            <CreatePost onDataChange={handleDataChange} />
            <GetPosts sharedData={sharedData}/>
        </div>
        
    )
}

export default Feed;