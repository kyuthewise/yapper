import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import debounce from 'lodash.debounce';
import DarkModeToggle from "../Feed/darkMode";
import { SearchIcon, UserAddIcon, LogoutIcon } from '@heroicons/react/outline'; // Import icons
const Navbar = ({setEventTrigger, eventTrigger}) => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const userid = session?.user?.id




  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(`/api/userSearch`, { params: { term } });
        setSearchResults(response.data.users);
        console.log('search response', response)

      } catch (error) {
        console.error('Error during search:', error);
        setSearchResults([]);
      }
    }, 500),
    []
  );
console.log('search results', searchResults)
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
    console.log('term:',term)
  };

  const handleAddFriend = async (addUserId) => {
    try{
  
      const response = await axios.post('/api/addFriend', {
        adduserid: addUserId,
        userid: userid


    
      }, {
        headers: {
            'Content-Type': 'application/json'
          }
      
      })
      console.log(`srv response`, response.data);
      if(response.status === 200 || response.status === 201){
        setEventTrigger(!eventTrigger)
      }
      } catch (error) {
      console.error('Error adding friend:', error);

    }
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-40 dark:text-slate-300 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo and Home Link */}

        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <p className="text-gray-800 text-2xl font-bold hover:text-gray-600 cursor-pointer">
              <img className="h-20 w-20 brightness-75 drop-shadow-lg dark:contrast-125"src="/icons/logopurplenth.svg"/>
            </p>
          </Link>
          <Link href="/dashboard">
            <p className="text-gray-700 text-md hover:text-gray-500 cursor-pointer dark:text-slate-300">
              Home
            </p>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow mx-4 ">
          <div className="flex items-center rounded-full bg-gray-100 px-4 py-2 dark:text-slate-300 dark:bg-gray-700">
            <SearchIcon className="h-5 w-5 text-gray-500" />
            <input 
              className="w-full bg-transparent py-2 px-4 text-gray-700 leading-tight focus:outline-none border-none dark:text-slate-300 dark:bg-gray-"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {searchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 p-2 shadow-md mt-1 rounded z-10 p-3">
              {searchResults.map((user) => (
                <div key={user._id} className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500 flex justify-between items-center">
                  <span>{user.name}</span>
                  <div>
                    <Link href={`/profile?userid=${user.name}`}>
                      <p className="text-sm bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2 cursor-pointer">View Profile</p>
                    </Link>
                    <button
                      onClick={() => handleAddFriend(user.name)}
                      className="text-sm bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white py-1 px-2 rounded flex items-center"
                    >
                      <UserAddIcon className="h-4 w-4 mr-1" />Add Friend
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={() => signOut()}
          className="ml-4 py-2 px-3 text-gray-800 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors duration-300 flex items-center dark:text-slate-300"
        >
          <LogoutIcon className="h-5 w-5 mr-2" />Sign Out
        </button>
        <DarkModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;
