
import UserInfo from "../UserInfo/UserInfoLayout"
import Feed from "../Feed/Feed"
import FriendList from "../UserInfo/FriendList"
import { useEffect, useState } from "react"
import BottomNavbar from "./BottomNavbar"
const MainContent = ({eventTrigger, setEventTrigger, disableInterface, setDisableInterface}) =>{
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showFriendList, setShowFriendList] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
useEffect(()=>{
setShowCreatePost(false)
setShowFriendList(false)
setShowUserInfo(false)
setDisableInterface(false)
}, [disableInterface])

return(
<div>
<div className="lg:hidden dark:text-white bg-red bottom-0 right-0 mr-5 mb-12  z-30 fixed">
      <button onClick={() => {setShowCreatePost(true)}}className={`${(showCreatePost === true || showFriendList === true || showUserInfo === true) ? `hidden` : `sticky absolute h-14 w-14 rounded-full bg-gray-200 dark:bg-indigo-700 shadow-2xl text-4xl text-center`}`}>+</button>
      </div>
<div className="h-screen bg-gray-300 flex flex-row justify-center dark:bg-gray-800 w-screen xl:w-auto"> 

<UserInfo showUserInfo={showUserInfo}/>
<Feed showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} showFriendList={showFriendList} setEventTrigger={setEventTrigger} eventTrigger={eventTrigger}/>
<FriendList showFriendList={showFriendList} eventTrigger={eventTrigger}/>
 <BottomNavbar 
        toggleUserInfo={() => {setShowUserInfo(!showUserInfo); setShowFriendList(false); setShowCreatePost(false)}} 
        toggleFriendList={() => {setShowFriendList(!showFriendList); setShowUserInfo(false); setShowCreatePost(false) }}

      />
      
</div>
</div>

)
}
export default MainContent