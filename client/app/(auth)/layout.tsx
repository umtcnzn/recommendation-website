"use client"

import React,{ useEffect, useState } from "react";
import { useAuth } from "../_context/userContext";
import { redirect } from "next/navigation";

function AuthLayout({children}:{
    children: React.ReactNode;
}) 
{
    const bgImages:string[] = ["books","movies"]
    const [bgImage,setBgImage] = useState("movies");

    const {user,tryFetch} = useAuth();
   useEffect(()=>{
        const imageInterval = setInterval(()=>{
            setBgImage(bgImages[Math.floor(Math.random()*bgImages.length)])
        },3000)
        if(!user){
            tryFetch()
        }
    },[])
    
    if(user){
        return redirect("/")
    }
    return (
    <>
        <div className={`w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover bg-fixed`} style={{backgroundImage:`url('/images/${bgImage}.png')`}}>
            {children}
        </div>
    </> 
    );
}

export default React.memo(AuthLayout);