import { UserIcon, UsersIcon, HomeIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const BottomNavbar = ({ toggleUserInfo, toggleFriendList, setDisableInterface}) => {

  const handleClick = () => {
    if(setDisableInterface){
    setDisableInterface(true);
    }
    // Any other actions you want to perform
  }
  return (
    <div className="bg-white dark:bg-gray-700 p-3 fixed bottom-0 inset-x-0 z-50 w-full flex justify-around items-center border-t border-gray-200 dark:border-gray-700 lg:hidden dark:text-gray-300">
   <Link href="/dashboard" onClick={handleClick}>
        <div className='flex flex-col items-center space-y-1'>
        <HomeIcon className='h-6 w-6 text-gray-700 dark:text-gray-300'/>
        <span className="text-xs text-gray-700 dark:text-gray-300">Home</span>
        </div>
      </Link>
      <button onClick={toggleFriendList} className="flex flex-col items-center space-y-1">
        <UsersIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xs text-gray-700 dark:text-gray-300">Friends</span>
      </button>
      <button onClick={toggleUserInfo} className="flex flex-col items-center space-y-1">
        <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xs text-gray-700 dark:text-gray-300">Profile</span>
      </button>
    </div>
  );
};
  
  export default BottomNavbar;
  