import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(Boolean);
  const {data:session} = useSession()
  const userid = session?.user?.name


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);



  useEffect(() => {

    const fetchData = async () => {
      
console.log('fetchusr:', userid)
      try{
        if(userid){
const response = await axios.get('/api/setDarkMode', {
  params: {userid}
  
})
setDarkMode(response.data.darkMode)
console.log(response.data)
        }


  }
  catch(error){
    console.log('error fetching darkmode', error)

  }
    }

    fetchData()
  }, [userid])


  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode);

    try{
    const response = axios.post('/api/setDarkMode', {
      userid: userid
    },
    {
      headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      console.log('drkmdresp: ', response.data)
    }
    catch(error){
      console.log('error setting darkmode, error')
    }
    
  };
  console.log(darkMode)
  return (
    <button 
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-200 text-gray-800 rounded-lg shadow"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
