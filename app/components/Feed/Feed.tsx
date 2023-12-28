import CreatePost from "./CreatePost";
import GetPosts from "./FeedPosts";
import { useState } from "react";
const Feed = ({setEventTrigger, eventTrigger}) => {

    const [sharedData, setSharedData] = useState('');

    const handleDataChange = (newData) => {
      setSharedData(newData);
      };

    return(
        <div className="h-full w-5/12 mt-10 absolute rounded-lg ">
            <CreatePost onDataChange={handleDataChange} setEventTrigger={setEventTrigger} />
            <GetPosts sharedData={sharedData} setEventTrigger={setEventTrigger} eventTrigger={eventTrigger}/>
        </div>
        
    )
}

export default Feed;