
import { useSession } from "next-auth/react"
import UserInfo from "./UserInfo"
import Feed from "./Feed"
import FriendList from "./FriendList"
const MainContent = () =>{
const {data:session} = useSession()
return(
<div className="h-screen bg-gray-300 flex flex-row justify-center"> 

<div className="h-screen bg-gray-300 flex flex-row justify-center">
<UserInfo/>
<Feed/>

<FriendList/>
</div>
</div>

)
}
export default MainContent