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
  
  export type Userface = {
    _id: string;
    name: string;
    image?: string;
  };
  
  export type Comment = {
    _id: string;
    user: string;
    text: string;
  };
export interface UserInfoProps {
    userid?: string; // or the specific type for userid
    currentUserId?: string; // or the specific type for currentUserId
  };

export interface GetPostsProps {
    sharedData: any; // Define the type based on what sharedData is
    selectedUser: string;
    setEventTrigger: (value: boolean) => void;
    eventTrigger: boolean;
  };

  export interface Credentials {
    name: string;
    password: string;
  }