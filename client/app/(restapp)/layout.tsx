"use client"
import React from 'react'
import Navbar from '../_components/Navbar'
import { useAuth } from '../_context/userContext';
import { redirect } from 'next/navigation';

function RestAppLayout({children}:{
    children: React.ReactNode;
}) {
    const {user} = useAuth();
    if(!user){
        redirect("/login")
    }
  return (
    <div className='w-screen h-screen'>    
        <Navbar/>
        {children}
    </div>
  )
}

export default RestAppLayout