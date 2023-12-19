import CreatePost from "./createPost";
import GetPosts from "./getPosts";
import { useState } from "react";
const Feed = () => {

    const [sharedData, setSharedData] = useState('');

    const handleDataChange = (newData) => {
      setSharedData(newData);
      };

    return(
        <div className="bg-white h-full w-5/12 mt-10 rounded-t-lg absolute">
            <CreatePost onDataChange={handleDataChange} />
            <GetPosts sharedData={sharedData}/>
        </div>
        
    )
}

export default Feed;