"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../_components/Navbar'
import { useAuth } from '../_context/userContext';
import { redirect } from 'next/navigation';



function RestAppLayout({children}:{
    children: React.ReactNode;
}) {
  const {user} = useAuth();
  
  if(!user){
    return redirect("/login")
  }
  return (
    <div className='w-screen h-screen'>    
        <Navbar/>
        <div className='pt-28'>
          {children}
        </div>
    </div>
  )
}

export default React.memo(RestAppLayout)