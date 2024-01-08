"use client"
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios';
import { MovieType } from '../_types/type';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '../_context/userContext';
import Movie from './Movie';
import Pagination from './Pagination';

function Movies({data,type}:{data:MovieType[],type:string}) {


  const {user} = useAuth();

  const [searchWord,setSearchWord] = useState<string>("");
  const [currentPage,setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
 

  const { data:watched_movies,isLoading } = useQuery("watched_movies", () =>
  axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_movies/${user?.username}`
  ).then((res) => res.data).catch((err)=>console.log(err))
  );
  


  const filteredMovies = data?.filter((item)=> item.title.toLowerCase().includes(searchWord.toLowerCase()));
  const movies = filteredMovies.slice(indexOfFirstMovie,indexOfLastMovie);

  
  if(searchWord != "" && currentPage != 1){
    setCurrentPage(1);
  }
  

  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
      Loading...
    </div>
  }

  return (
    <div className='w-full h-full'>
      <div className='bg-gray-700 mx-10 drop-shadow-2xl px-8 py-4 rounded-xl'>
          <p className='flex justify-center text-3xl font-bold'>{type}</p>
          <div className='flex justify-center mb-10 gap-4'>
            <InputText className='w-[400px]' placeholder='Search For Movie...' value={searchWord} onChange={(e:any)=>setSearchWord(e.target.value)}/>
          </div>
          <Pagination totalNumbers={filteredMovies.length} dataPerPage={moviesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <div className='flex justify-center'>
          </div>
          <div className='grid grid-cols-4 gap-5'>
              {movies?.map((item)=>{
                const isWatched = type === "WATCHED MOVIES"?true: watched_movies.some((watched_movie:any)=>watched_movie.movie_id === item.id)
                return(
                  <Movie movie={item} isItWatched={isWatched} user={user!}/>
                )
              })}
          </div>
      </div>
    </div>
  )
  
}

export default React.memo(Movies)