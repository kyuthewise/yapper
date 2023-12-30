"use client";

import Navbar from "../components/Layout/Navbar";
import MainContent from "../components/Layout/MainContent";
import { useState, useEffect } from "react";
import Loader from 'react-loader-spinner';
import {BallTriangle} from 'react-loader-spinner';

export default function Dashboard(){
    const [loading, setLoading] = useState(true);
    const [eventTrigger, setEventTrigger] = useState(false)
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      }, []);

    return (
      
<div>

<div className={loading ? 'hidden' : ''}>
<Navbar setEventTrigger={setEventTrigger} eventTrigger={eventTrigger}></Navbar>
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
<div className={`${loading ? 'hidden' : 'flex h-screen bg-gray-300 dark:bg-gray-800 flex-col xl:mt-20 items-center'}`}>


<MainContent setEventTrigger={setEventTrigger} eventTrigger={eventTrigger}></MainContent>
 </div> 
 </div>
    )}