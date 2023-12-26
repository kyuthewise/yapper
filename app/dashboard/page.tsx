"use client";

import Navbar from "../components/Layout/Navbar";
import MainContent from "../components/Layout/MainContent";
import { useState, useEffect } from "react";
import Loader from 'react-loader-spinner';
import {BallTriangle} from 'react-loader-spinner';

export default function Dashboard(){
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      }, []);

    return (
      
<div>

<div className={loading ? 'hidden' : ''}>
<Navbar></Navbar>
</div>

{loading && (
    <div className="flex justify-center h-screen z-30 place-items-center bg-gray-800">
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#3f4040"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
     </div> )}
<div className={`${loading ? 'hidden' : 'flex h-full bg-gray-300 dark:bg-gray-800 flex-col mt-20 items-center'}`}>


<MainContent></MainContent>
 </div> 
 </div>
    )}