"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState,useRef } from 'react';

function Navbar() {

const router = useRouter();
const [recomMenu,setRecomMenu] = useState(false);
const [watchedMenu,setWatchedMenu] = useState(false);
const watchedMenuRef = useRef<HTMLLIElement>(null);
const recomMenuRef = useRef<HTMLLIElement>(null);

const toggleRecomMenu = () => {
    setRecomMenu((prevent) => !prevent);
};
const toggleWatchedMenu = () => {
    setWatchedMenu((prevent) => !prevent);
};

const closeMenu = (event:MouseEvent) => {
    if (recomMenuRef.current && !recomMenuRef.current.contains(event.target as Node)) {
      setRecomMenu(false);
    }
    if (watchedMenuRef.current && !watchedMenuRef.current.contains(event.target as Node)) {
        setWatchedMenu(false);
      }
  };


useEffect(() => {
    document.addEventListener('mousedown',closeMenu);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
}, []);


return (
    <nav className='w-full bg-gray-800 h-20 px-4 fixed top-0 z-10'>
        <div className="flex justify-between items-center w-full h-full">
          <div className="text-xl font-bold cursor-pointer">
            <Link href={"/"} className='cursor-pointer hover:text-gray-400 no-underline text-white'>Recommendation App</Link>
          </div>
          <ul className="flex space-x-4 list-none">
            <li><Link href="/movies" className='cursor-pointer hover:text-gray-400 no-underline text-white'>Movies</Link></li>
            <li><Link href="/series" className='cursor-pointer hover:text-gray-400 no-underline text-white'>Series</Link></li>
            <li><Link href="/books" className='cursor-pointer hover:text-gray-400 no-underline text-white'>Books</Link></li>
            <li onClick={toggleWatchedMenu} className='relative' ref={watchedMenuRef}>
              <a className='cursor-pointer hover:text-gray-400'>Watched/Read</a>
              <div className={`flex flex-col gap-4 px-4 absolute bg-black text-white rounded-lg shadow-lg mt-2 py-4 right-3 ${watchedMenu?'':'hidden'}`}>
                <Link href='/watched-read/movies' className='cursor-pointer hover:text-gray-400 no-underline text-white'>Movies</Link>
                <Link href='/watched-read/series' className='cursor-pointer hover:text-gray-400 no-underline text-white'>Series</Link>
                <Link href='/watched-read/books' className='cursor-pointer hover:text-gray-400 no-underline text-white'>Books</Link>
              </div>
            </li>
            <li onClick={toggleRecomMenu} className='relative' ref={recomMenuRef}>
              <a className='cursor-pointer hover:text-gray-400' >Get Recommendation</a>
              <div  className={`flex flex-col gap-4 px-8 absolute bg-black text-white rounded-lg shadow-lg mt-2 py-4 right-5 ${recomMenu?'':'hidden'}`}>
                <Link href='/getRecom/movies' className='cursor-pointer hover:text-gray-400 no-underline text-white'>Movies</Link>
                <Link href='/getRecom/series' className='cursor-pointer hover:text-gray-400 no-underline text-white'>Series</Link>
                <Link href='/getRecom/books' className='cursor-pointer hover:text-gray-400 no-underline text-white'>Books</Link>
              </div>
            </li>
          </ul>
        </div>
    </nav>
  );
};

export default React.memo(Navbar);