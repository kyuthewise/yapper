import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import debounce from 'lodash.debounce';
import DarkModeToggle from "../Feed/darkMode";
import { SearchIcon, UserAddIcon, LogoutIcon, HomeIcon } from '@heroicons/react/outline';
import { Userface } from "@/app/types/types";
import { NavbarProps } from "@/app/types/types";

const Navbar: React.FC<NavbarProps> = ({ setEventTrigger, eventTrigger, disableInterface, setDisableInterface }) => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Userface[]>([]);
  const userid = session?.user?.id;
  const searchBarRef = useRef<HTMLDivElement>(null); // Reference for the search bar

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(`/api/userSearch`, { params: { term } });
        setSearchResults(response.data.users);
      } catch (error) {
        console.error('Error during search:', error);
        setSearchResults([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSearchResults([]); // Clears the search results if clicked outside
      }
    };

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term: string = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleAddFriend = async (addUserId: String) => {
    try {
      const response = await axios.post('/api/addFriend', {
        adduserid: addUserId,
        userid: userid
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        if (setEventTrigger) {
          setEventTrigger(!eventTrigger);
        }
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const handleClick = () => {
    if (setDisableInterface) {
      setDisableInterface(true);
    }
  };
  return (
    <nav className="bg-white shadow-lg fixed top-0 z-30 dark:text-slate-300 dark:bg-gray-900 w-full">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center space-x-6 mr-auto"> {/* Adjusted for left alignment */}
          <Link href="/dashboard">
            <p className="flex items-center justify-center">
              <img className="h-20 w-20 brightness-75 drop-shadow-lg dark:contrast-125" src="/icons/logopurplenth.svg" alt="Logo" />
            </p>
          </Link>
    
        </div>

    {/* Search Bar */}
    <div className="lg:relative flex-grow mx-4" ref={searchBarRef}>
      <div className="flex items-center rounded-full bg-gray-100 px-5 py-3 dark:bg-gray-700"> {/* Increased padding */}
        <SearchIcon className="h-5 w-5 text-gray-500 mr-3" /> {/* Added margin */}
        <input 
          className="w-full bg-transparent py-2 px-4 text-gray-700 leading-tight focus:outline-none border-none dark:text-slate-300"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {/* Dropdown Menu */}
      {searchResults && searchResults.length > 0 && (
        <div className="mt-10 absolute left-0 lg:top-full  right-0 bg-white dark:bg-gray-700 p-3 shadow-md mt-1 rounded z-10">
          {searchResults.map((user) => (
            
      <div key={user._id} className="p-3 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-500 flex justify-between items-center space-x-3"> {/* Increased padding and space */}
              <Link href={`profile?userid=${user.name}`}>
              <div className="flex flex-column justify-center items-center">
              <img src={user.image} className="w-10 h-10 object-cover rounded-full"></img>
              <span className="ml-2">{user.name}</span> </div> </Link>
              
              <div className="flex space-x-2"> {/* Added space between buttons */}
                <Link href={`/profile?userid=${user.name}`}>
                  <p className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded cursor-pointer w-24">View Profile</p>
                </Link>
                <button
                  onClick={() => handleAddFriend(user.name)}
                  className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded flex items-center w-24 whitespace-nowrap"
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
    <div className="flex items-center space-x-4 hidden lg:inline-flex"> {/* Added spacing */}
      <button 
        onClick={() => signOut()}
        className="py-2 px-3 text-gray-800 bg-transparent hover:bg-gray-200 rounded transition-colors duration-300 flex items-center dark:text-slate-300"
      >
        <LogoutIcon className="h-5 w-5 mr-2" />Sign Out
      </button>
      <DarkModeToggle />
    </div>
  </div>
</nav>

  );
};

export default Navbar;
