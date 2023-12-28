
import UserInfo from "../UserInfo/UserInfoLayout"
import Feed from "../Feed/Feed"
import { useState } from "react"
import FriendList from "../UserInfo/FriendList"
const MainContent = ({eventTrigger, setEventTrigger}) =>{

return(
<div className="h-screen bg-gray-300 flex flex-row justify-center dark:bg-gray-800"> 

<div className="h-screen bg-gray-300 flex flex-row justify-center ">
<UserInfo />
<Feed setEventTrigger={setEventTrigger} eventTrigger={eventTrigger}/>

<FriendList eventTrigger={eventTrigger}/>
</div>
</div>

)
}
export default MainContent