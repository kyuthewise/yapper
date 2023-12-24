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
        }, 1500); 
      }, []);

    return (
      
<div>
<Navbar></Navbar>

<div className="flex h-full bg-gray-300 flex-col mt-20">
{loading && (
    <div className="flex justify-center items-center h-screen">
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#555555"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
     </div> )}

<MainContent></MainContent>
 </div> 
 </div>
    )}