import { UserIcon, UsersIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const BottomNavbar = ({ toggleUserInfo, toggleFriendList}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-3 fixed bottom-0 inset-x-0 z-20 w-full flex justify-around items-center border-t border-gray-200 dark:border-gray-700 lg:hidden dark:text-gray-300">
      <button onClick={toggleUserInfo} className="flex flex-col items-center space-y-1">
        <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xs text-gray-700 dark:text-gray-300">Profile</span>
      </button>
      <button onClick={toggleFriendList} className="flex flex-col items-center space-y-1">
        <UsersIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xs text-gray-700 dark:text-gray-300">Friends</span>
      </button>
      <Link href=""> </Link>
    </div>
  );
};
  
  export default BottomNavbar;
  