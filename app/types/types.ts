export type Post = {
    _id: string;
    user: string;
    filename?: string;
    likes: number;
    likedBy: string[];
    comments: Comment[];
    createdAt: string;
    message: string;
  };
  import { User as NextAuthUser } from "next-auth";
  export type Userface = {
    _id: string;
    name: string;
    image?: string;
  };

  export interface ExtendedUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;

  }
  export type Comment = {
    _id: string;
    user: string;
    text: string;
  };
export interface UserInfoProps {
    userid?: string; 
    currentUserId?: string; 
    showUserInfo?: boolean
  };
export interface NavbarProps {
    setEventTrigger?: (value: boolean) => void;
    eventTrigger?: boolean;
    disableInterface?: boolean;
    setDisableInterface?: (value: boolean) => void;
  }
  
export interface GetPostsProps {
    sharedData: string
    selectedUser: string;
    setEventTrigger: (value: boolean) => void;
    eventTrigger: boolean;
    showFriendList?: boolean;
  };
export interface GetProfileProps{
  sharedData?: string
  selectedUser: string;
  setEventTrigger?: (value: boolean) => void;
  eventTrigger?: boolean;
}
export type Messageface ={
  _id: string,
  userid: string,
  message:string

}
export type Credentials = Record<string, string> & {
  name: string;
  password: string;
  // Any other fields you need
};